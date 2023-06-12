import UserSchema from "../../models/UserModel.js";
import { StatusCodes } from "http-status-codes";

export class AuthController {
  static async register(req, res) {
    try {
      const users = UserSchema.find();
      res.statusCode(StatusCodes.OK).json({ result: users });
    } catch (e) {
      console.log(e);
    }
  }

  static async login(req, res) {
    try {
      const users = UserSchema.find();
      res.statusCode(StatusCodes.OK).json({ result: users });
    } catch (e) {
      console.log(e);
    }
  }

  static async logout(req, res) {
    try {
      const users = UserSchema.find();
      res.statusCode(StatusCodes.OK).json({ result: users });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateUser(req, res) {
    try {
      const users = UserSchema.find();
      res.statusCode(StatusCodes.OK).json({ result: users });
    } catch (e) {
      console.log(e);
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const users = UserSchema.find();
      res.statusCode(StatusCodes.OK).json({ result: users });
    } catch (e) {
      console.log(e);
    }
  }
}
