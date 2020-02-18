import { NextApiRequest, NextApiResponse } from "next";
import { withDB } from "../../../../lib/database";
import User from "../../../../lib/database/schemas/user2_schema";

export default withDB(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { token }
  } = req;

  try {
    await User.findOneAndUpdate({ token }, { token: "" });
    return res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: "Error" });
  }
});
