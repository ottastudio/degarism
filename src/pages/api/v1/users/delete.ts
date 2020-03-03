import { withDB } from "../../../../lib/database";

export default withDB(async (_req, res, db) => {
  const { User } = db;

  return User.deleteMany({})
    .then(response => res.status(200).json({ response }))
    .catch(err => res.status(403).json({ err }));
});
