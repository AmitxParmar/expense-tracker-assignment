import mongoose from "mongoose";

enum Status {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}

const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        enum: Status,
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Expense', ExpenseSchema);
