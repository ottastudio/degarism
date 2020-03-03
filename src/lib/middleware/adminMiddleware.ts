import { NextApiRequest, NextApiResponse } from "next";
import { IDatabase } from "../../../global";
import { verify } from "jsonwebtoken";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  db: IDatabase,
  nextmove: () => void
) => {
  const {
    headers: { authorization }
  } = req;

  const { User } = db;
  const token = authorization && authorization.split(" ")[1];
  const secret = process.env.SESSION_SECRET as string;
  const user = await User.findOne({ accessToken: token });

  if (token === undefined) {
    return res.status(401).json({ success: false, message: "Unauthorized!" });
  } else if (!user) {
    return res
      .status(403)
      .json({ success: false, message: "You should login again!" });
  } else {
    return verify(token, secret, err => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: err.message
        });
      } else if (user?.role === 0) {
        return res.status(403).json({
          success: false,
          message: "You're not allowed!"
        });
      } else {
        nextmove();
      }
    });
  }
};
