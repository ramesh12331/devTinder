const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests")
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
app.use(cookieParser())


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

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



