const express = require("express");
const { adminAuth, userAuth } = require("../middlewares/auth");

const app = express();

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong!!");
    }
})

app.get("/getUserData",(req,res)=>{
    try {
        throw new Error("cdfcdc");
        res.send("User Data Send");
    } catch (error) {
        res.status(500).send("Some error contact support team");
    }
    
})



app.listen(5000,()=>{
    console.log("Server is successfully listening on port 5000....");
});