const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup",async(req,res)=>{
    console.log(req.body);
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



