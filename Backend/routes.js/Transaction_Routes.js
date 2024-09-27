import express from 'express';
import Transaction from '../models/Transaction.js';
import User_Profile from '../models/User.js';

const Transaction_routes = express.Router();

Transaction_routes.post('/transaction' , async(req , res) => {
    try{
        const { user, amount, transactionType } = req.body

        const User = await User_Profile.findById(user);

        if(!User){
            return res.status(400).json({ error: 'User not found' });
        }

        const newTransaction = new Transaction({
            amount,
            reason : req.body.reason,
            user : User.id,
            transactionType
        });

        if(newTransaction.transactionType == 'credit'){
            User.balance = User.balance + newTransaction.amount;
        }
        else if(newTransaction.transactionType == 'debit'){
            if(User.balance >= newTransaction.amount){
                User.balance = User.balance - newTransaction.amount;
            }
            else{
                return res.status(400).json({ error: 'Not enough Balance' });
            }
        }
        else{
            return res.status(400).json({ error: 'Invalid transaction type' });
        }

        await User.save()
        await newTransaction.save()

        res.status(201).json({ message: 'Transaction successful', newTransaction });

    }catch(err){
        res.status(500).json({ error: 'Error creating transaction' });
    }
})

Transaction_routes.put('/transaction/:id' , async(req , res) =>{
    try{
        const { user, amount, transactionType } = req.body

        const User = await User_Profile.findById(user);

        if(!User){
            return res.status(400).json({ error: 'User not found' });
        }

        const existingTransaction = await Transaction.findById(req.params.id)

        if (existingTransaction.transactionType === 'credit') {
            User.balance -= existingTransaction.amount; 
        } else if (existingTransaction.transactionType === 'debit') {
            User.balance += existingTransaction.amount;
        }

        if(transactionType === 'credit'){
            User.balance = User.balance + amount;
        }
        else if(transactionType === 'debit'){
            if(User.balance >= amount){
                User.balance = User.balance - amount;
            }
            else{
                return res.status(400).json({ error: 'Not enough Balance' });
            }
        }
        else{
            return res.status(400).json({ error: 'Invalid transaction type' });
        }

        await User.save()
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,  
            { new: true, runValidators: true }
        );

        res.status(201).json({ message: 'Transaction updation successful', updatedTransaction });
    }catch(err){
        res.status(500).json({ error: 'Error updating transaction' });
    }
})

Transaction_routes.get('/transaction' , async(req , res) =>{
    try{

        const Transaction_list = await Transaction.find()
        if(Transaction_list == null){
            return res.status(404).json({ message: 'No transaction found' });
        }
        res.status(200).json(Transaction_list)
    }catch(err){
        res.status(500).json({ error: 'Error fetching transactions' });
    }
})

Transaction_routes.delete('/transaction/:id' , async(req , res) => {
    try{
        
        const existingTransaction = await Transaction.findById(req.params.id)

        if(existingTransaction == null){
            return res.status(404).json({ message: 'No transaction found' });
        }
        const User = await User_Profile.findById(existingTransaction.user);

        if (existingTransaction.transactionType === 'credit') {
            User.balance -= existingTransaction.amount; 
        } else if (existingTransaction.transactionType === 'debit') {
            User.balance += existingTransaction.amount;
        }

        await User.save()
        const deletedTransaction = await Transaction.findByIdAndDelete(
            req.params.id,
            { new: true }
        )
        res.status(200).json(deletedTransaction)

    }catch(err){
        res.status(500).json({ error: 'Error deleting transaction' });
    }
})


export default Transaction_routes