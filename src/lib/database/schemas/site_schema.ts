import { Type, createSchema } from "ts-mongoose";

const name = createSchema(
  {
    full: Type.string({ required: true }),
    short: Type.string({ required: true })
  },
  { _id: false }
);
const domicile = createSchema(
  {
    country: Type.string({ required: true }),
    city: Type.string({ required: true }),
    province: Type.string({ required: true }),
    zip: Type.number({ required: true })
  },
  { _id: false }
);
const partners = createSchema({
  name: Type.string({ required: true }),
  url: Type.string({ required: true })
});
const about = createSchema(
  {
    body: Type.string({ required: true })
  },
  { _id: false }
);

const siteSchema = createSchema(
  {
    name: Type.object({ required: true }).of(name),
    domicile: Type.object({ required: true }).of(domicile),
    partners: Type.array({ required: true }).of(partners),
    about: Type.array({ required: true }).of(about)
  },
  { timestamps: { createdAt: true } }
);

export default siteSchema;
