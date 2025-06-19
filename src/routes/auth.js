const express = require("express");
const { ValidateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


authRouter.post("/signup",async(req,res)=>{
    
    try {
        // Validation of data
        ValidateSignUpData(req);

        const {firstName,lastName,emailId,password} = req.body;
        //Encript the password
        const passwordHash =await bcrypt.hash(password,10);
        console.log(passwordHash);
        // Creating a new instance of the User Model
        // const user = new User(req.body);

        const user = new User({
            firstName,lastName,emailId,password:passwordHash
        });

        await user.save();
        res.send("User added Successfully");
    } catch (error) {
        res.status(400).send("Error saving the user:"+error.message);
    }
});

authRouter.post("/login",async(req,res)=>{
  try {
    const {emailId,password} = req.body;

    const user = await User.findOne({emailId:emailId});
    if(!user){
        throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validPassword(password);
    if(isPasswordValid){
        // Create JWT Token
        // const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn : "1d",});
        const token = await user.getJWT();

        console.log(token);
        // Add the token to cookie and send the response back to the user
        // res.cookie("token", "kvdddjghhdefrgjrkheufgefeghedgeddhedj");
        res.cookie("token", token, {
            expires : new Date(Date.now() + 8 * 3600000),
        }); 


        res.send("Loin Successfull!!!");
    }else{
        throw new Error("Invalid Credentials");
    }
  } catch (error) {
        res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfull!!!");
})

module.exports = authRouter;