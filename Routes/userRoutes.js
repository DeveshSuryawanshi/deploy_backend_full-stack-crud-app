const express = require("express");
const {UserModel} = require("../modles/userModel");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async(req, res) =>{
    const {username, email, pass} = req.body;
    try {
        bcrypt.hash(pass, 5 , async(err, hash) =>{
            if(err){
                res.send({"error" : err});
            }else{
                const user = UserModel({username, email, pass : hash});
                await user.save();
                res.send({"msg" : "New user has been registered", "user" : user});
            }
        })
    } catch (error) {
        res.send({"error" : error})
    }
})

userRouter.post("/login", async(req, res) =>{
    const {email, pass} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=>{
                if(result){
                    const token = Jwt.sign({userID:user._id,user : user.username}, "masai");
                    res.send({"msg" : "Logged in!", "token" : token})
                }else{
                    res.send({"err" : err});
                }
            })
        }else{
            res.send({"msg" : "User Dose not Exist!!"})
        }
    } catch (error) {
        res.send({"error" : error});
    }
})



module.exports = {
    userRouter
}