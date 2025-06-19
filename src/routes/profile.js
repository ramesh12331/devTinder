const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile",userAuth,async(req,res)=>{
   try {
    //  const cookies = req.cookies;

    // const {token} = cookies;

    // if(!token){
    //     throw new Error("Invalid Token");
    // }

    // // validate token
    // const decodedMessage = await jwt.verify(token,"DEV@Tinder$790");
    // // console.log(decodedMessage);
    // const {_id} = decodedMessage;
    // // console.log("Logged in user is : " + _id);

    const user = req.user;
    // if(!user){
    //     throw new Error("User does not exist");
    // }
    res.send(user);
   } catch (error) {
    res.status(400).send("ERROR : " + error.message);
   }
})

module.exports = profileRouter;