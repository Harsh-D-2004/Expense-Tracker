
import mongoose from "mongoose";
import User_Profile from "./User.js";

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User_Profile, 
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['credit', 'debit'],  
        required: true,
    },
    date :{
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction' , transactionSchema)

export default Transaction