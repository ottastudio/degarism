import { withDB } from "../../../../lib/database";
import authMiddleware from "../../../../lib/middleware/authMiddleware";

export default withDB(async (req, res, db) => {
  const {
    method,
    body,
    headers: { authorization }
  } = req;
  const token = authorization && authorization.split(" ")[1];

  // MONGOOSE METHODS
  const { User } = db;
  const filter = { accessToken: token };
  const profile = await User.findOne(filter);
  const updatedProfile = await User.findOneAndUpdate(filter, body, {
    new: true
  });

  switch (method) {
    case "GET":
      authMiddleware(req, res, () => {
        if (profile) {
          return res.status(202).json({ success: true, profile });
        } else {
          return res.json({ success: false, profile });
        }
      });
      break;

    case "PATCH":
      await updatedProfile?.save();
      authMiddleware(req, res, () => {
        try {
          return res.status(200).send(updatedProfile);
        } catch (err) {
          return res.status(400).send(err);
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
