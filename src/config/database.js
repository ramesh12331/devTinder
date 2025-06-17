const mongoose = require("mongoose");


const connectDB = async ()=>{
//    await mongoose.connect("mongodb+srv://ramesh:A5bZkmzxnt1b1XiQ@namaste.tralvpw.mongodb.net/?retryWrites=true&w=majority&appName=Namaste")
await mongoose.connect("mongodb+srv://ramesh:A5bZkmzxnt1b1XiQ@namaste.tralvpw.mongodb.net/devTinder")
}

module.exports = connectDB;

