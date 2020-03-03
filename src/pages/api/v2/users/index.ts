import { NextApiRequest, NextApiResponse } from "next";
import { withDB } from "../../../../lib/database";
import { withAuth } from "../../../../lib/middleware/withAuth";

export type TWithAuth = {
  req: NextApiRequest;
  res: NextApiResponse;
  auth: boolean;
  author: boolean;
  admin: boolean;
};

export default withDB(async (_req, _res, db) => {
  // CHECKING FOR AUTH USER && () => Promise<void>
  withAuth(async ({ req, res, auth, author, admin }: TWithAuth) => {
    const { method, query } = req;
    if (!auth) {
      return res.json({
        success: false,
        role: "unknown"
      });
    } else if (auth && !author && !admin) {
      // THIS RETURN AS AUTH USER / REGULAR / ROLE = 0
      return res.status(200).json({
        success: true,
        role: "user"
      });
    } else {
      const { User } = db;
      switch (method) {
        case "GET":
          // THIS RETURN AS SUPER CREDENTIAL USER / ROLE = 2 / 1
          let order = query.order ? query.order : "asc";
          let sortBy = query.sortBy ? query.sortBy : "_id";
          let limit = query.limit ? parseInt(query.limit as string) : 10;

          return User.find()
            .sort([[sortBy, order]])
            .limit(limit)
            .then(users => res.status(200).json(users))
            .catch(err => res.status(400).send(err));

        default:
          return (
            res.setHeader("Allow", ["GET", "PUT"]),
            res.status(405).end(`Method ${method} Not Allowed!`)
          );
      }
    }
  });
});

// const all = async (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   auth: boolean,
//   author: boolean,
//   admin: boolean
// ) => {
//   const { method, query } = req;

//   if (!auth) {
// return res.json({
//   success: false,
//   role: "unknown"
// });
//   } else {
// if (auth && !author && !admin) {
// // THIS RETURN AS AUTH USER / REGULAR / ROLE = 0
// return res.status(200).json({
//   success: true,
//   role: "user"
// });
// }
//     switch (method) {
//       case "GET":
// if (auth && author || admin) {
//   // THIS RETURN AS ADMINISTRATOR / ROLE = 2
//   let order = query.order ? query.order : "asc";
//   let sortBy = query.sortBy ? query.sortBy : "_id";
//   let limit = query.limit ? parseInt(query.limit as string) : 10;
//   const users = await User.find()
//     .sort([[sortBy, order]])
//     .limit(limit);
//   return res.status(200).json({
//     users
//   });
// }
// default:
//   return (
//     res.setHeader("Allow", ["GET", "PUT"]),
//     res.status(405).end(`Method ${method} Not Allowed!`)
//   );
//     }
//   }
// };

// export default withDB(withAuth(all));
