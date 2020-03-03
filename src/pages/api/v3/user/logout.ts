import { withDB } from "../../../../lib/database";
import authMiddleware from "../../../../lib/middleware/authMiddleware";

export default withDB(async (req, res, db) => {
  const {
    headers: { authorization }
  } = req;
  const { User } = db;
  const token = authorization && authorization.split(" ")[1];
  const user = await User.findOneAndUpdate(
    { accessToken: token },
    { accessToken: "" },
    { new: true }
  );

  return authMiddleware(req, res, () => {
    if (!user) {
      return res.json({
        success: false,
        message: "You weren't logged in yet!"
      });
    } else {
      return res.json({ success: true, message: "Logged out" });
    }
  });
});
