const User = require("../models/User")
const jwt = require("jsonwebtoken")
const userAuth = async(req,res,next)=>{



try { 
     const {token} = req.cookies;
if(!token){
   return res.status(401).send("You must be logged in")
}
const id = await jwt.verify(token  , "AAABBBCCC111");
const {_id} = id;
const user = await User.findById(_id);
if(!user){
    throw new Error("User not found!")
}

req.user = user;
next();
}
catch (err) {
    console.error("Error occurred:"); // Logs the error to the terminal
    res.status(400).send({ error: err.message }); // Send error details to Postman
}

}

module.exports = {
    userAuth,
}