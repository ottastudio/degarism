import { withDB } from "../../../../lib/database";

export default withDB(async (req, res, db) => {
  const { User } = db;

  if (!req.headers.authorization) {
    return res.json({
      success: false,
      profile: null,
      message: "You're not allowed!"
    });
  }

  const { token } = await JSON.parse(req.headers.authorization);
  return User.findOne({ accessToken: token })
    .then(user => {
      if (!user) {
        res.json({
          success: false,
          message: "Login required!",
          profile: null
        });
      } else {
        res.json({
          success: true,
          message: `Hello, ${user.name.first_name}.`,
          profile: user
        });
      }
    })
    .catch(err => res.status(401).send(err));
});
