const express = require('express');
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const UserModel = require('../model/userModel');


const userRoute = express.Router()


userRoute.post("/register", async(req,res)=>{

    try {

        const {Username, Avatar, Email, Password} = req.body

        const userExsist = await UserModel.findOne({Email:Email})

        if(userExsist){
           return res.status(400).json({error:"User Already Exsist"})
        }

        const user = UserModel(req.body)

        bcrypt.hash(Password, 10, function(err, hash) {
            
            user.Password = hash
            user.save()

            res.status(200).json({message:"User Registered Successfully", user:user})

        });

        
    } catch (error) {
        res.json({error:error.message})
    }

})

userRoute.post("/login", async(req,res)=>{

    try {
        const {Email, Password} = req.body

        const user = await UserModel.findOne({Email:Email})

        if(!user){
            return res.status(400).json({error:"User Does Not Exsist"})
        }

        bcrypt.compare(Password, user.Password, function(err, result) {
    
            if(err){
             return res.status(400).json({error:"Incorrect Password"})
            }
            if(result){
                const token = jwt.sign({ userId : user._id, UserName : user.Username }, '123');
                res.status(200).json({message:"User Successfully Logged In", token:token, username:user.Username, img:user.Avatar})
            }
            
        });
        
    } catch (error) {
        res.json({error:error.message})
    }

})




module.exports = userRoute

/*

{
    "Email" : "b@b.com",
    "Password" : "123"
}

{
"title":"Hello",
"content":"hello",
"category":"Business",
"likes":0
}

*/