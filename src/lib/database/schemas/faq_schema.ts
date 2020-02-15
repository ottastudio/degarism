import { Type, createSchema } from "ts-mongoose";

export default createSchema(
  {
    topic: Type.string({ required: true }),
    markup: Type.string({ required: true })
  },
  { timestamps: { createdAt: true } }
);
