import { withDB } from "../../../../lib/database";

export default withDB(async (req, res, db) => {
  const { method, body, query } = req;
  const filter = query.id
    ? { _id: query.id }
    : query.token
    ? { token: query.token }
    : {};
  const { User } = db;

  switch (method) {
    case "GET": // GET USERS
      try {
        const users = await User.find(filter);
        return res
          .status(200)
          .json({ success: true, message: "These are our users", users });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case "POST": // REGISTER API
      const register = new User(body);
      return register
        .save()
        .then(user => {
          res.status(200).send(user);
        })
        .catch(err => res.status(403).send(err));

    case "DELETE": // DELETE ALL USERS
      try {
        await User.deleteMany((err: any) => {
          if (err) return res.status(401);
          return res
            .status(200)
            .json({ success: true, message: "All users deleted" });
        });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    default:
      return (
        res.setHeader("Allow", ["GET", "PUT"]),
        res.status(405).end(`Method ${method} Not Allowed!`)
      );
  }
});

// export default withDB(siteData);
