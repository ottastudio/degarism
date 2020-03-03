import { withDB } from "../../../../lib/database";

export default withDB(async (_req, res, db) => {
  const { User } = db;
  return User.findOne({})
    .then(users => {
      return res.status(200).json({ users });
    })
    .catch(err => res.status(400).json({ err }));
});
