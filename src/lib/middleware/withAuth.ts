import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../lib/database/schemas/user_schema";

export const withAuth = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse,
  auth: boolean = false,
  author: boolean = false,
  admin: boolean = false
) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      auth = false;
      author = false;
      admin = false;
    } else {
      const { token } = JSON.parse(authorization);
      await User.findOne({ accessToken: token }).then(user => {
        switch (user?.role) {
          case 0:
            auth = true;
            author = false;
            admin = false;
            break;
          case 1:
            auth = true;
            author = true;
            admin = false;
            break;
          case 2:
            auth = true;
            author = true;
            admin = true;
            break;
          default:
            auth = false;
            author = false;
            admin = false;
            break;
        }
      });
    }
  } catch (error) {
    throw error;
  }
  return handler(req, res, auth, author, admin);
};
