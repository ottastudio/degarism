import { withDB } from "../../../../lib/database";
import adminMiddleware from "../../../../lib/middleware/adminMiddleware";

export default withDB(async (req, res, db) => {
  const { method, query, body } = req;
  const { User } = db;

  let order = query.order ? query.order : "asc";
  let sortBy = query.sortBy ? query.sortBy : "_id";
  let limit = query.limit ? parseInt(query.limit as string) : 10;

  const users = await User.find()
    .sort([[sortBy, order]])
    .limit(limit);

  switch (method) {
    case "GET":
      await adminMiddleware(req, res, db, () => {
        try {
          return res.status(200).send(users);
        } catch (error) {
          return res.send(error);
        }
      });
      break;

    case "PUT":
      const newPassword = body.password;
      const newRole = body.role;

      const user = await User.findById(body._id);
      const updatedUser = await user
        ?.set("password", newPassword)
        .set("role", newRole)
        .save();

      await adminMiddleware(req, res, db, () => {
        try {
          return res.status(200).send(updatedUser);
        } catch (error) {
          return res.status(400).send(error);
        }
      });
      break;

    default:
      return (
        res.setHeader("Allow", ["GET", "PUT"]),
        res.status(405).end(`Method ${method} Not Allowed!`)
      );
  }
});
