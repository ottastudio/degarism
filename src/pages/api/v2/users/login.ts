import { withDB } from "../../../../lib/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default withDB(async (req, res, db) => {
  const { User } = db;
  const { body } = req;

  const missingForm = {
    email: "Required!",
    password: "Required!"
  };

  if (!body.email || !body.password) {
    return res.json({
      success: false,
      message: {
        email: missingForm.email,
        password: missingForm.password
      }
    });
  } else {
    await User.findOne({ email: body.email }).then(async user => {
      if (!user) {
        return res.json({
          success: false,
          message: { email: "Not Found!", password: null }
        });
      } else {
        await bcrypt.compare(body.password, user.password).then(isMatch => {
          if (!isMatch) {
            return res.json({
              success: false,
              message: { email: null, password: "Wrong password!" }
            });
          } else {
            const token = jwt.sign(
              { user: user._id },
              process.env.SESSION_SECRET as string
            );

            user.accessToken = token;
            user.refreshToken = [token];
            return user.save().then(loggedIn => {
              res.status(200).json({
                success: true,
                message: {
                  email: `Logged in as ${loggedIn.email}`,
                  password: null
                },
                loggedIn
              });
            });
          }
        });
      }
    });
  }
});
