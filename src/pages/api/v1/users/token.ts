import { withDB } from "../../../../lib/database";
import jwt from "jsonwebtoken";

const generateToken = async (user: any) => {
  return jwt.sign(user, process.env.SESSION_SECRET as string, {
    expiresIn: "15s"
  });
};

export default withDB(async (req, res, db) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).send("Unauthorized!");

  const { User } = db;
  (await User.find({})).filter(usr => {
    if (!usr.refreshToken.includes(refreshToken)) {
      return res.status(403).send("Forbidden. Login required!");
    } else {
      return jwt.verify(
        refreshToken,
        process.env.SESSION_SECRET_REFRESH as string,
        (err: jwt.VerifyErrors, decode: any) => {
          if (err) return res.status(403).send("Gundik Lo");
          const accessToken = generateToken(decode);
          res.status(200).send(accessToken);
        }
      );
    }
  });
});
