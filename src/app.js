const express = require("express");
const { adminAuth, userAuth } = require("../middlewares/auth");

const app = express();

app.use("/admin",adminAuth);

app.post("/user/login",(req,res)=>{
    res.send("User login successfully!");
})

app.get("/user",userAuth,(req,res)=>{
    res.send("User Data Send");
})

app.get("/admin/getAllData",(req,res)=>{
    
    res.send("All Data Sent")
});

app.get("/admin/deleteAllData",(req,res)=>{
    res.send("delete");
})

app.listen(5000,()=>{
    console.log("Server is successfully listening on port 5000....");
});