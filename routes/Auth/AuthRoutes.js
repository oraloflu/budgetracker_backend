import express from "express";
import { AuthController } from "../../controllers/Auth/AuthController.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

router.route("/register").post(AuthController.register);
router.route("/login").post(AuthController.login);
router.route("/showme").post(AuthController.getCurrentUser);
router.route("/update").post(AuthController.updateUser);
router.route("/logout").delete(auth, AuthController.logout);

export default router;
