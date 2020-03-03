import { Schema, model, models } from "mongoose";
import { ISiteDocument, ISiteModel } from "../../../../global";

const siteSchema: Schema<ISiteDocument> = new Schema(
  {
    name: {
      full: String,
      short: String
    },
    domicile: {
      country: String,
      city: String,
      province: String,
      zip: String
    },
    partners: [{ name: String, url: String }],
    about: [{ body: String }]
  },
  { timestamps: { createdAt: true } }
);

export const Site: ISiteModel =
  models.Site || model<ISiteDocument>("Site", siteSchema);
