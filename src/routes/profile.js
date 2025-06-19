const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation")

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
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
});

profileRouter.patch("/profile/edit",userAuth, async(req,res)=>{
    try {
      if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit Request");
        // return res.status(400).send("")
      }
      const loggedInUser = req.user;

    //   loggedInUser.firstName = req.body.firstName;

    Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]));
    
      await loggedInUser.save();


    //   res.send(`${loggedInUser.firstName}, Your Profile Updated Successfull!!!`);
      res.json({message:`${loggedInUser.firstName}, Your Profile Updated Successfully!!!`,data:loggedInUser,});

    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
});

module.exports = profileRouter;