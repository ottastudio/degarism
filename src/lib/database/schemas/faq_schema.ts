import { Type, createSchema } from "ts-mongoose";

export default createSchema(
  {
    topic: Type.string({ required: true }),
    question: Type.string({ required: true }),
    answer: Type.string({ required: true })
  },
  { timestamps: { createdAt: true } }
);
