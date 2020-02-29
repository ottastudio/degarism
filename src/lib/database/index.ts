import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { IDatabase } from "../../../global";

import { User } from "./schemas/user_schema";
import { Faq } from "./schemas/faq_schema";
import { Site } from "./schemas/site_schema";
import { Category } from "./schemas/category_schema";

export const withDB = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    db: IDatabase
  ) => Promise<void>
) => async (req: NextApiRequest, res: NextApiResponse) => {
  const db = { User, Faq, Site, Category };

  if (mongoose.connection.readyState) return handler(req, res, db);
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
      return handler(req, res, db);
    })
    .catch(err => {
      const errHandler = (_req: NextApiRequest, res: NextApiResponse) => {
        res.status(500).send("🥴 CANNOT CONNECT TO DATABASE");
      };
      console.log("🙏 DB ERROR", err);
      return errHandler;
    });
};
