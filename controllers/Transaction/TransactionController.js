import TransactionModel from '../../models/TransactionModel.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../../errors/index.js';

export class TransactionController {
    static async getTransactions(req, res) {
        try {
            const userID = req.user.userId;
            if (!userID) {
                throw new UnauthenticatedError('Invalid credentials');
            }
            const transactions = await TransactionModel.find({ createdBy: userID }).sort(
                'createdAt'
            );
            res.statusCode(StatusCodes.OK).json({
                result: transactions,
                count: transactions.length
            });
        } catch (e) {
            console.log(e);
        }
    }

    static async getTransaction(req, res) {
        try {
            const userID = req.user.userId;
            if (!userID) {
                throw new UnauthenticatedError('Invalid credentials');
            }
            const { id: transactionID } = req.params;
            if (!transactionID) {
                throw new BadRequestError('Transaction Id must be supply');
            }

            const transaction = await TransactionModel.findOne({
                _id: transactionID,
                createdBy: userID
            });
            
            if (!transaction) {
                throw new BadRequestError(`No transaction with id : ${transactionID}`);
            }
            res.statusCode(StatusCodes.OK).json({ result: transaction });
        } catch (e) {
            console.log(e);
        }
    }

    static async createTransaction(req, res) {
        try {
            if (!req.user.userId) {
                throw new UnauthenticatedError('Invalid credentials');
            }
            req.body.createdBy = req.user.userId;

            const { payment_mode, description, type, category, amount, date } = req.body;
            if (!payment_mode || !description || !type || !category || !amount || !date) {
                throw new BadRequestError('All values must be supplied!');
            }

            const transaction = await TransactionModel.create(req.body);

            res.statusCode(StatusCodes.CREATED).json({ result: transaction });
        } catch (e) {
            console.log(e);
        }
    }

    static async updateTransaction(req, res) {
        try {
            const userID = req.user.userId;
            if (!userID) {
                throw new UnauthenticatedError('Invalid credentials');
            }
            const { id: transactionID } = req.params;
            if (!transactionID) {
                throw new BadRequestError('Transaction Id must be supply');
            }

            const { payment_mode, description, type, category, amount, date } = req.body;

            if (!payment_mode || !description || !type || !category || !amount || !date) {
                throw new BadRequestError('All values must be provided!');
            }

            const transaction = await TransactionModel.findByIdAndUpdate(
                { _id: transactionID, createdBy: userID },
                req.body,
                { new: true, runValidators: true }
            );
            if (!transaction) {
                throw new BadRequestError(`No transaction with id : ${transactionID}`);
            }

            res.statusCode(StatusCodes.OK).json({
                message: 'Transaction has been successfully updated!'
            });
        } catch (e) {
            console.log(e);
        }
    }

    static async deleteTransaction(req, res) {
        try {
            const {
                user: userID,
                params: { id: transactionID }
            } = req;
            if (!userID) {
                throw new UnauthenticatedError('Invalid credentials');
            }

            if (!transactionID) {
                throw new BadRequestError('Transaction Id must be supply');
            }

            const transaction = await TransactionModel.findByIdAndRemove({
                _id: transactionID,
                createdBy: userID
            });

            if (!transaction) {
                throw new BadRequestError(`No transaction with id : ${transactionID}`);
            }

            res.status(StatusCodes.OK).json({
                msg: 'Success! Transaction has been deleted!'
            });
        } catch (e) {
            console.log(e);
        }
    }
}
