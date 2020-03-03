import { compareSync } from "bcrypt";
import { withDB } from "../../../../lib/database";
import generateAccessToken from "../../../../lib/helper/generateAccessToken";

export default withDB(async (req, res, db) => {
  const { body } = req;
  const { User } = db;
  const user = await User.findOne({ email: body.email });

  const userData = { email: body.email, password: body.password };
  const accessToken = generateAccessToken(userData);

  if (!body.email) {
    return res.json({
      message: { email: "required", password: null }
    });
  } else if (!body.password) {
    return res.json({
      message: { email: null, password: "required" }
    });
  } else if (!user) {
    return res.json({
      message: { email: `Not found!`, password: null }
    });
  } else {
    const isMatch = compareSync(body.password, user.password);
    try {
      if (!isMatch) {
        return res.json({
          message: { email: null, password: "Wrong password!" }
        });
      } else {
        user.accessToken = accessToken;
        const loggedIn = await user.save();
        return res.status(202).json({
          message: `Logged in as ${loggedIn.name.first_name}`,
          loggedIn
        });
      }
    } catch (error) {
      res.status(406).send(error);
    }
  }
});
