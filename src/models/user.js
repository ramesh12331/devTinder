const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength :100
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        lowercase : true,
        unique: true,
        index : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : String,
        min : 18,
        
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender Data is not found");
            }
        },
    },
    photoUrl : {
        type : String,
        default : "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
    },
    about : {
        type : String,
        default : "This is a default of the user!",
    },
    skills : {
        type : [String],
    }
},
{
    timestamps:true,
}
);



module.exports = mongoose.model("User",userSchema);