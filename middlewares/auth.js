 const adminAuth = (req,res,next)=>{
    console.log("Admin Auth is grtting checked!!");
    const token = "xyz";
    const isAdminAuth = token === "xyz";
    if(!isAdminAuth){
        res.status(401).send("UnAuthorized request");
    }else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    console.log("user Auth is grtting checked!!");
    const token = "xyza";
    const isAdminAuth = token === "xyz";
    if(!isAdminAuth){
        res.status(401).send("UnAuthorized request");
    }else{
        next();
    }
}

module.exports = {adminAuth,userAuth};