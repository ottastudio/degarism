import { withDB } from "../../../../lib/database";

export default withDB(async (req, res, db) => {
  const {
    query: { token }
  } = req;
  const { User } = db;

  return User.findOneAndUpdate({ accessToken: token }, { accessToken: "" })
    .then(() => {
      res.status(200).json({ success: true, message: "Logged Out" });
    })
    .catch(err => {
      res.status(403).send(err);
    });
});
