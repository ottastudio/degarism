import { withDB } from "../../../../lib/database";

export default withDB(async (req, res, db) => {
  const { body } = req;
  const { User } = db;

  if (!body.name.first_name) {
    // Check if First Name empty : Client side
    return res.json({
      message: {
        name: { first_name: "required", last_name: null },
        email: null,
        password: null
      }
    });
  } else if (!body.name.last_name) {
    // Check if Last Name empty : Client side
    return res.json({
      message: {
        name: { first_name: null, last_name: "required" },
        email: null,
        password: null
      }
    });
  } else if (!body.email) {
    // Check if Email empty : Client side
    return res.json({
      message: {
        name: { first_name: null, last_name: null },
        email: "required",
        password: null
      }
    });
  } else if (!body.password) {
    // Check if Password empty : Client side
    return res.json({
      message: {
        name: { first_name: null, last_name: null },
        email: null,
        password: "required"
      }
    });
  } else {
    try {
      const registered = await new User(body).save();
      return res.status(201).send(registered);
    } catch (error) {
      if (error.code === 11000) {
        // Check if Email Duplicated : Server side
        return res.json({
          message: {
            name: { first_name: null, last_name: null },
            email: "has been registered",
            password: null
          }
        });
      } else {
        return res.json({
          // Check if Something Wrong : Server side & I don't know
          message: {
            name: { first_name: null, last_name: null },
            email: null,
            password: null
          }
        });
      }
    }
  }
});
