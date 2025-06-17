const express = require("express");

const app = express();


// This will only handle GET call to /user
app.get("/user",(req,res)=>{
    res.send({firstname:"Ramesh",lastname:"mamidi"})
})

app.post("/user",(req,res)=>{
    res.send("Send data to database Successfully!");
})
app.delete("/user",(req,res)=>{
    res.send("Delete Successfully!");
})
// this will match all the HTTP method API calls to /test
app.use("/test",(req,res)=>{
    res.send("Hello World!")
})


app.listen(5000,()=>{
    console.log("Server is successfully listening on port 5000....");
});