import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    title: String,
    type: String,
    background_color: String,
    icon: String,
  },
  {
    versionKey: false,
  }
);

export const Category = model<any>("Category", CategorySchema);
