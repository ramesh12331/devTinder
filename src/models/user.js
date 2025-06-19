const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }
        }
    },
    password : {
        type : String,
        required : true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password" + value);
            }
        }
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
        default : "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo address" + value);
            }
        },
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

userSchema.methods.getJWT = async function () {
    const user = this;
  const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn : "7d",});

  return token;
}

userSchema.methods.validPassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);

    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);