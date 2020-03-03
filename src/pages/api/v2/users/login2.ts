import jwt from "jsonwebtoken";

const generateToken = (user: any) => {
  return jwt.sign(user, process.env.SESSION_SECRET as string);
};

// simulate db
let refTokens: any[] = [];

const login2 = async (req: any, res: any) => {
  switch (req.method) {
    case "POST": // LOGIN METHOD AND CREATE AUTH
      const email = req.body.email;
      const accessToken = generateToken(email);
      const refreshToken = jwt.sign(
        email,
        process.env.SESSION_SECRET_REFRESH as string
      );
      refTokens.push(refreshToken);
      return res.json({ accessToken, refreshToken });

    case "PATCH": // PATCH / POST TOKEN TO DATABASE, WILL NOT WORK IF NOT LOGGED IN / AUTHENTICATION
      const tokenFromAuthPatch = req.body.token;
      if (refTokens.length <= 0)
        return res.json({ message: "Logged in required" });
      if (!refTokens.includes(tokenFromAuthPatch))
        return res.json({ message: "Forbidden" });

      return jwt.verify(
        tokenFromAuthPatch,
        process.env.SESSION_SECRET_REFRESH as string,
        (err: any, user: any) => {
          if (err) return res.status(403);
          const accessToken2 = generateToken(user);
          return res.json({ accessToken2, refTokens });
        }
      );

    case "DELETE": // LOGOUT
      if (refTokens.length <= 0) {
        return res.json({ message: "Not logged in, refTokens empty" });
      } else {
        refTokens = refTokens.filter((token: any) => token !== req.body.token);
        return res.json({ message: "Logged out" });
      }

    case "GET": // GET AND SHOULD AUTHENTICATE BY INCLUDING TOKEN TO REQUEST
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token === null) {
        return res.status(401).json({ message: "Gak ada token" });
      } else {
        return jwt.verify(
          token,
          process.env.SESSION_SECRET as string,
          (err: any, user: any) => {
            if (err) {
              return res.status(401).json({ message: "Gak verify" });
            } else {
              return res.json({ user, accessToken: token, refTokens });
            }
          }
        );
      }

    default:
      return (
        res.setHeader("Allow", ["GET", "PUT"]),
        res.status(405).end(`Method ${req.method} Not Allowed!`)
      );
  }
};

export default login2;
