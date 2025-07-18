const validator = require("validator");

const ValidateSignUpData = (req) =>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid!");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter Valid Password!");
    }
};

const validateEditProfileData = (req) =>{
    const allowedEditFields = [
        "firstNam","lastName","emailId","photoUrl","gender","age","about","skills",
    ];
   const isEditAllowed = Object.keys(req.body).every(field=>allowedEditFields.includes(field));

   return isEditAllowed;
}

module.exports = {
    ValidateSignUpData,validateEditProfileData 
}