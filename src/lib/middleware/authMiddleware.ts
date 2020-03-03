import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default (
  req: NextApiRequest,
  res: NextApiResponse,
  nextmove: () => void
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const secret = process.env.SESSION_SECRET as string;

  if (token === undefined) {
    return res.json({ success: false, message: "Unauthorized!" });
  } else {
    jwt.verify(token, secret, err => {
      if (err) {
        return res.json({
          success: false,
          message: err.message
        });
      } else {
        nextmove();
      }
    });
  }
};
