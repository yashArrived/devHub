const express = require("express");
const bcrypt = require("bcrypt")
const {validateUser, hashpassword} = require("../utils/validation");
const jwt = require("jsonwebtoken")

const User  = require("../models/User")


const authRouter = express.Router();

authRouter.post("/signUp" , async(req,res)=>{
    
    const data = req.body;
    const{firstName,lastName , email,password } = data;
    //Encrypt the password
    
    //Creating a new instance of User model
    // User.syncIndexes();
    try{
        //validate user data
        validateUser(req);
        
        const hashedpassword = await hashpassword(req);
        const userObj = new User({
            firstName,
            lastName,
            email,
            password : hashedpassword
        });
    await userObj.save();
    res.send("User added successfully");
    }
    catch (err) {
        console.error("Error occurred:"); // Logs the error to the terminal
        res.status(400).send({ error: err.message }); // Send error details to Postman
    }
}); 


authRouter.post("/login" , async(req,res)=> {

    try{
         
        const{email,password } = req.body;
        
    const user = await User.findOne({email});
    if(!user ){
        throw new Error("Invalid Credentials");
    }
    if(user){
        const hashedpwd = user.password ;
        const isValid = await bcrypt.compare(password,hashedpwd);
        if(isValid){
                    //Create JWT token
                    const token = await jwt.sign({_id : user._id} , "AAABBBCCC111")
                    // add the token to cookie and send the response back to the user 

            res.cookie("token" , token);
            res.send("Logged in successfully");
        }
        if(!isValid){
            throw new Error("Invalid Credentials");
    }
    }
    }
    catch (err) {
        console.error("Error occurred:"); // Logs the error to the terminal
        res.status(400).send({ error: err.message }); // Send error details to Postman
    }
})
authRouter.post("/logout" , async(req,res)=>{
    try{
        // res.cookie("token" ,null ,{
        //     expires : new Date(Date.now()),
        // });
        res.clearCookie("token");
        res.send("Logged out successfully");
    }
    catch (err) {
        console.error("Error occurred:"); // Logs the error to the terminal
        res.status(400).send({ error: err.message }); // Send error details to Postman
    }
}) 
 
module.exports = authRouter;