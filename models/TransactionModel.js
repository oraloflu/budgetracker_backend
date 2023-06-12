import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    payment_mode: {
        type: String,
        required: [true, 'Please provide payment mode of the transaction'],
        default: 'cash'
    },
    description: {
        type: String,
        required: [true, 'Please provide description']
    },
    type: {
        type: String,
        required: [true, 'Please provide type of the transaction']
    },
    category: {
        type: String,
        required: [true, 'Please provide category of the transaction'],
        maxLength: 100,
        default: 'food'
    },
    amount: {
        type: Number,
        required: [true, 'Please provide expense amount'],
    },
    date: {
        type: Date,
        required: [true, 'Please provide date info']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    }
},
  { timestamps: true }
);


export default mongoose.model('Transaction', TransactionSchema);
