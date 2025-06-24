const express = require("express");
const { userAuth } = require("../middlewares/auth");
// const connectionRequestModel = require("../models/connectionRequest");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status : "interested"
        }).populate("fromUserId", USER_SAFE_DATA);

        // }).populate("fromUserId",["firstName","lastName"]);

        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        })
    } catch (error) {
        req.statusCode(400).send("ERROR : "+ error.message)
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
   try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
             $or: [
                {toUserId : loggedInUser._id,status:"interested"},
                {fromUserId : loggedInUser._id,status:"interested"},
             ],
        }).populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA);

        const data = connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({data})
        // res.json({data:connectionRequest})
   } catch (error) {
        res.status(400).send({message:error.message})
   }
});

userRouter.get("/feed",userAuth,async(req,res)=>{
    try {
        // User
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 2;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit; 
        // Find all connection requests(sent + received)
        const connectionRequests = await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}],
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });
        console.log(hideUserFromFeed);
        const users = await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}},
            ]

        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.send(users);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

module.exports = userRouter;