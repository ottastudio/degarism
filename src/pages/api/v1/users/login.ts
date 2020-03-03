import { withDB } from "../../../../lib/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = async (user: any) => {
  return jwt.sign(user, process.env.SESSION_SECRET as string, {
    expiresIn: "15s"
  });
};

export default withDB(async (req, res, db) => {
  const { body } = req;
  const { User } = db;
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res.json({
      success: false,
      message: {
        email: `Not found!`,
        password: null
      }
    });
  } else {
    return bcrypt
      .compare(body.password, user.password)
      .then(async isMatch => {
        if (!isMatch) {
          return res.json({
            success: false,
            message: { email: null, password: "Wrong password!" }
          });
        } else {
          const userTokens = {
            _id: user._id,
            email: user.email,
            password: user.password
          };

          const accessToken = await generateToken(userTokens);
          const refreshToken = jwt.sign(
            userTokens,
            process.env.SESSION_SECRET_REFRESH as string
          );

          user.accessToken = accessToken;
          user.refreshToken.push(refreshToken);

          return user
            .save()
            .then(loggedIn => {
              res.status(200).json({
                success: true,
                message: {
                  email: `Logged in as ${loggedIn.name}`,
                  password: `Logged in as ${loggedIn.name}`
                },
                loggedIn
              });
            })
            .catch(err => res.status(500).json({ err }));
        }
      })
      .catch(err => res.status(500).json({ err }));
  }
});
