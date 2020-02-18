import { NextApiRequest, NextApiResponse } from "next";
import { withDB } from "../../../../lib/database";
import User from "../../../../lib/database/schemas/user2_schema";

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.authorization) {
    return res.json({ success: false, message: "You're not allowed!" });
  }

  try {
    const { token } = JSON.parse(req.headers.authorization);
    const user = await User.findOne({ token });
    if (!user) {
      return res.json({
        success: false,
        message: "Login required!",
        profile: user
      });
    } else {
      return res.json({
        success: true,
        message: `Hello, ${user.name}.`,
        profile: user
      });
    }
  } catch (error) {
    throw error;
  }
};

export default withDB(profile);
