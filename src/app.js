const express = require("express");

const app = express();


// This will only handle GET call to /user
app.use("/user",(req,res,next)=>{
    console.log("Handling the route use!!");
    // res.send("response1")
    next()
},
(req,res,next)=>{
    console.log("Handling the route use!!");
    // res.send("response2")
    next()
},
(req,res,next)=>{
    console.log("Handling the route use!!");
    // res.send("response3")
    next()
},
(req,res,next)=>{
    console.log("Handling the route use!!");
    res.send("response4")
}
)




app.listen(5000,()=>{
    console.log("Server is successfully listening on port 5000....");
});