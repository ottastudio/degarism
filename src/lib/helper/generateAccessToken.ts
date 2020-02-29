import { sign } from "jsonwebtoken";

const secret: string = process.env.SESSION_SECRET as string;
export default (user: { email: string; password: string }) => {
  return sign(user, secret, { expiresIn: "1m" });
};
