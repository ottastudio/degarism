import { Schema, model, models } from "mongoose";
import { IFaqModel, IFaqDocument } from "../../../../global";

const faqSchema: Schema<IFaqDocument> = new Schema(
  {
    topic: {
      type: String,
      required: true
    },
    markup: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: true } }
);

export const Faq: IFaqModel =
  models.Faq || model<IFaqDocument>("Faq", faqSchema);
