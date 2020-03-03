import { Schema, model, models } from "mongoose";
import { ICategoryModel, ICategoryDocument } from "../../../../global";

const categorySchema: Schema<ICategoryDocument> = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Category: ICategoryModel =
  models.Category || model<ICategoryDocument>("Category", categorySchema);
