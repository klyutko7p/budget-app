import { Currency } from "~~/server/models/Currency";

export default defineEventHandler(async (event) => {
  const currencies = await Currency.find();

  return { currencies };
});
