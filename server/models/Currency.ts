import { Schema, model } from "mongoose";

const CurrencySchema = new Schema(
  {
    title: String,
    abbr: String,
  },
  {
    versionKey: false,
  }
);

export const Currency = model<any>("Currency", CurrencySchema);
