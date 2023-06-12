import express from "express";
import { TransactionController } from "../../controllers/Transaction/TransactionController.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(auth, TransactionController.getTransactions)
  .post(auth, TransactionController.createTransaction);

router
  .route("/:id")
  .get(auth, TransactionController.getTransaction)
  .patch(auth, TransactionController.updateTransaction)
  .delete(auth, TransactionController.deleteTransaction);

export default router;
