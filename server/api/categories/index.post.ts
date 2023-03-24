import { Category } from "~~/server/models/Category";

interface IRequestBody {
  _id: string;
  title: string;
  type: string;
  background_color: string;
  icon: string;
  message: string;
}

export default defineEventHandler(async (event) => {
  console.log("POST /api/categories");
  const { _id, title, type, background_color, icon, message } =
    await readBody<IRequestBody>(event);
  const filter = { _id };
  const update = {
    $set: {
      title: title,
      type: type,
      background_color: background_color,
      icon: icon,
    },
  };
  try {
    if (_id && message !== "delete") {
      console.log("Edit category");
      await Category.updateOne(filter, update);
    } else if (message === "delete") {
      console.log("Delete category");
      await Category.deleteOne(filter);
    } else {
      console.log("Create category");
      await Category.create({
        title,
        type,
        background_color,
        icon,
      });
    }
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something wrong.",
    };
  }
});
