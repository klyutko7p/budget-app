import { Category } from "~~/server/models/Category";

export default defineEventHandler(async (event) => {
  const categories = await Category.find();

  return { categories };
});
