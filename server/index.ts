import { Nitro } from "nitropack";
import mongoose from "mongoose";

<<<<<<< HEAD
export default async (_nitroApp: Nitro) => {
  try {
    const config = useRuntimeConfig();
    mongoose.connect(config.mongodbUrl);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
=======
// export default async (_nitroApp: Nitro) => {
//   try {
//     const config = useRuntimeConfig();
//     mongoose.connect(config.mongodbUrl);
//     console.log("MongoDB is connected");
//   } catch (error) {
//     console.log(error);
//   }
// };
>>>>>>> dbab5cd26a39d56883d23628bdc6fee2f06e7ad4
