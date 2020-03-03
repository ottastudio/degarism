import { withDB } from "../../../../lib/database";

export default withDB(async (req, res, db) => {
  const {
    headers: { authorization }
  } = req;
  if (!authorization) {
    return res.status(403).json({ message: "You're not authenticate" });
  }

  const { User } = db;
  const authHeader = authorization && authorization.split(" ")[1];
  return User.findOneAndUpdate(
    { accessToken: authHeader },
    { refreshToken: [] }
  )
    .then(user => {
      if (!user) {
        return res
          .status(403)
          .json({ message: "Logout failed, UUID not exsisted", authHeader });
      } else if (user.refreshToken.length <= 0) {
        return res.status(401).json({ message: "You're not logged in" });
      } else {
        return res.status(200).json({ message: "Logged out", authHeader });
      }
    })
    .catch(err => res.status(400).send(err));
});
