
import express from 'express';
import User_Profile from '../models/User.js';

const User_routes = express.Router();

User_routes.post('/users', async (req, res) => {
    try {
        const newUser = new User_Profile(req.body);
        await newUser.save();
        res.status(200).json({userId : newUser._id});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

User_routes.get('/users' , async (req , res) => {
    try{
        const user_list = await User_Profile.find()
        res.status(200).json(user_list)
    }catch(err){
        res.status(400).json({ error: err.message });
    }
})

User_routes.put('/users/:id' , async (req , res) => {
    try{
        const updatedUser = await User_Profile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if(!updatedUser){
            res.status(401).json({'error' : 'User not found'})
        }
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(400).json({ error: err.message });
    }
})

User_routes.get('/users/uid/:id' , async(req , res) => {
    try{
        const id = req.params.id
        const user = await User_Profile.findById(id)
        if(!user){
            res.status(401).json({'error' : 'User not found'})
        }
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({ error: err.message });
    }
})

User_routes.post('/users/login' , async(req , res) => {
    try{
        const user = await User_Profile.findOne({email : req.body.email})
        if(!user){
            res.status(401).json({'error' : 'Invalid email or password'})
        }
        var isValidPassword = false
        if(user.password == req.body.password){

            isValidPassword = true
        }
        if(!isValidPassword){
            res.status(401).json({'error' : 'Invalid email or password'})
        }

        res.status(200).json(user)

    }catch(err){
        res.status(400).json({ error: err.message });
    }
})


User_routes.delete('/users/:id' , async (req , res) => {
    try{
        const deletedUser = await User_Profile.findByIdAndDelete(req.params.id,)
        if(!deletedUser){
            res.status(401).json({'error' : 'User not found'})
        }
        res.status(200).json({"msg" : "user deleted Successfully"})
    }catch(err){
        res.status(400).json({ error: err.message });
    }
})

export default User_routes;