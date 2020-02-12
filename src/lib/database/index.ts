import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export const withDB = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (mongoose.connection.readyState) return handler(req, res);

  mongoose.Promise = global.Promise;
  return await mongoose
    .connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(responseDB => {
      console.log(`🚀 CONNECTION TO MONGODB ESTABLISHED`);
      console.log(
        `💾 ${responseDB.connections[0].host}:${responseDB.connections[0].port}/${responseDB.connections[0].name}`
      );
      return handler(req, res);
    })
    .catch(err => {
      const errHandler = (_req: NextApiRequest, res: NextApiResponse) => {
        res.status(500).send("🥴 CANNOT CONNECT TO DATABASE");
      };
      console.log("🙏 DB ERROR", err);
      return errHandler;
    });
};
