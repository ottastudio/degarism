import { Type, createSchema } from "ts-mongoose";

const faqSchema = createSchema(
  {
    topic: Type.string({ required: true }),
    markup: Type.string({ required: true })
  },
  { timestamps: { createdAt: true } }
);

export default faqSchema;
