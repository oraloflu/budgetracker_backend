import { cleanEnv, str, num } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    MONGO_URI: str(),
    JWT_SECRET: str(),
    JWT_LIFETIME: str(),
    PORT: num(),
  });
}

export default validateEnv;
