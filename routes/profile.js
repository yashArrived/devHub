const express = require("express");
const {userAuth} = require("../middlewares/auth");
const User = require("../models/User");
const profileRouter = express.Router();

profileRouter.get("/profile/view" ,userAuth, async(req,res)=> {

    try{
       
     
    //token validation logic  here------ 
   

            const user = req.user;
    console.log("Logged in user is : " ,  user.firstName); 
    
    // console.log(req.cookies);
    // console.log(decodedMsg);
    
    res.send(user)}
    catch (err) {
        console.error("Error occurred"); // Logs the error to the terminal
        res.status(400).send({ error: err.message }); // Send error details to Postman
    }
    
})
profileRouter.patch("/profile/edit" ,userAuth, async(req,res)=> {
try{
    const data = req.body;
    
    const ALLOWED_UPDATES  = ["age" , "skills" , "about" , "photoUrl" , "password"];
        const isAllowedUpdates = Object.keys(data).every((k)=>
                    ALLOWED_UPDATES.includes(k)
        )
        if(!isAllowedUpdates){
            throw new Error ("You cannot edit this data");
        }
            const user = req.user;
            const id = user._id;
        await User.findByIdAndUpdate({_id : id},data,{runValidators : true});
        res.json({ message : "Data updated successfully" ,
            data : data
        } );

}
catch (err) {
    console.error("Error occurred"); // Logs the error to the terminal
    res.status(400).send({ error: err.message }); // Send error details to Postman
}})

module.exports = profileRouter;