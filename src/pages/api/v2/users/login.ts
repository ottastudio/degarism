import { withDB } from "../../../../lib/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../../lib/database/schemas/user2_schema";

export default withDB(async (req: NextApiRequest, res: NextApiResponse) => {
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
  }

  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.json({
        success: false,
        message: {
          email: `Cannot find "${body.email}"!`,
          password: null
        }
      });
    } else {
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (!isMatch) {
        return res.json({
          success: false,
          message: { email: null, password: "Wrong password!" }
        });
      } else {
        const token = jwt.sign(
          user._id.toHexString(),
          process.env.SESSION_SECRET as string
        );

        user.token = token;
        const loggedIn = await user.save();
        return res.status(200).json({
          success: true,
          message: {
            email: `Logged in as ${loggedIn.name}`,
            password: `Logged in as ${loggedIn.name}`
          },
          loggedIn
        });
      }
    }
  } catch (error) {
    return res.status(401).send("Login required!");
  }
});
