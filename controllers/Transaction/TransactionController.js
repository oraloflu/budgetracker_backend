import TransactionSchema from "../../models/TransactionModel.js";
import { StatusCodes } from "http-status-codes";

export class TransactionController {
  static async getTransactions(req, res) {
    try {
      const expenses = await TransactionSchema.find({ createdBy: req.user.userId });
      res.statusCode(StatusCodes.OK).json({ result: expenses });
    } catch (e) {
      console.log(e);
    }
  }

  static async getTransaction(req, res) {
    try {
      const id = req.query.id;
      const expenses = await TransactionSchema.find({ createdBy: id });
      res.statusCode(StatusCodes.OK).json({ result: expenses });
    } catch (e) {
      console.log(e);
    }
  }

  static async createTransaction(req, res) {
    try {
      const id = req.query.id;
      const expenses = await TransactionSchema.find({ createdBy: id });
      res.statusCode(StatusCodes.OK).json({ result: expenses });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateTransaction(req, res) {
    try {
      const id = req.query.id;
      const expenses = await TransactionSchema.find({ createdBy: id });
      res.statusCode(StatusCodes.OK).json({ result: expenses });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteTransaction(req, res) {
    try {
      const id = req.query.id;
      const expenses = await TransactionSchema.find({ createdBy: id });
      res.statusCode(StatusCodes.OK).json({ result: expenses });
    } catch (e) {
      console.log(e);
    }
  }
}
