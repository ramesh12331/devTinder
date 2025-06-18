const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup",async(req,res)=>{
    // console.log(req.body);
    // // const userObj = {
    // //     firstName : "Ramesh",
    // //     lastName  : "Mamidi",
    // //     emailId   : "ram@gmail.com",
    // //     password  : "ram@123",

    // // }
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User added Successfully");
    } catch (error) {
        res.status(400).send("Error saving the user:"+error.message);
    }
});

//Get user by email
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
    
    try {

        const user = await User.findOne({emailId:userEmail});
        
        if(!user){
            res.send("User not found")
        }else{
            res.send(user);
        }
    //   const users=await User.find({emailId:userEmail});
    //   if(users.length === 0){
    //     res.status(404).send("Users not found")
    //   }else{
    //     res.send(users);
    //   }
      
    } catch (error) {
        res.status(400).send("Something went wrong");
    }

    
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed",async(req,res)=>{
    try {
        const users =await User.find({})
        res.send(users)
    } catch (error) {
        res.status(400).send("Something Went Wrong");
    }
    
    
});

//DeleteById

app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({_id:userId});
        // const user = await User.findByIdAndDelete(userId)
        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send("Something Went Wrong");
    }

});

//Update data
app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

    
    
    try {
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];

    const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
        throw new Error("Updated not Allowed");
    }   

    if(data?.skills.length>10){
        throw new Error("Skills cannot be more than 10");
    }

    // **************

        const user = await User.findByIdAndUpdate({_id:userId},data,{returnDocument : "before",runValidators : true});
        console.log(user);
        res.send("User updated Successfully");
        
    } catch (error) {
        res.status(400).send("UPDATE FAILED :" + error.message);
    }
})

connectDB()
.then(()=>{
    console.log("Database connection established...");
    app.listen(5000,()=>{
    console.log("Server is successfully listening on port 5000....");
});
})
.catch((err)=>{
    console.log("Database cannot be established...");
})



