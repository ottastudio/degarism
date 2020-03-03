import { withDB } from "../../../lib/database";
import authMiddleware from "../../../lib/middleware/authMiddleware";

export default withDB(async (req, res, db) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const { User } = db;
  const user = await User.findOne({ accessToken: token });
  const users = await User.find({});

  authMiddleware(req, res, () => {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "You should login!",
        role: "unknown",
        user: null
      });
    } else if (user.role === 0) {
      return res.status(200).json({
        success: true,
        message: `Auth as ${user.name.first_name}`,
        role: "customer",
        user: user
      });
    } else if (user.role === 1) {
      return res.status(200).json({
        success: true,
        message: `Auth as ${user.name.first_name}`,
        role: "author",
        user: user
      });
    } else {
      return res.status(200).json({
        success: true,
        message: `Auth as ${user.name.first_name}`,
        role: "administrator",
        user: user,
        users: users
      });
    }
  });
});
