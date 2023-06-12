import "dotenv/config";
import validateEnv from "./utils/validation/validateEnv.js";
import connectDB from "./db/connection.js";
import { App } from "./app.js";

validateEnv();

const app = new App();

const run = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen();
  } catch (e) {
    console.log(e);
  }
};

run()
  .then(() => console.log("Everything seems to be working properly!"))
  .catch((e) => console.log(e));
