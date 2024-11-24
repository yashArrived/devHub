

const express = require("express");
const {userAuth} = require("../middlewares/auth")
const userRouter = express.Router();
const User  = require("../models/User");
const { ConnectionRequestModel } = require("../models/connectionRequest");

 

userRouter.get("/user/requests/recieved" ,userAuth ,async(req,res)=>{


    try{
         const loggedInUser = req.user;
         const connectionRequest = await ConnectionRequestModel.find({
            toUserId : loggedInUser._id,
            status : "interested"
         }).populate("fromUserId" , "firstName  lastName photoUrl age gender skills ")
         if(!connectionRequest){
         return   res.status(404).send({
                message : "No connection requests."
            })
         }
     res.send({
       message : "Connection requests fetched successfully" ,
       data : connectionRequest }
        // firstName + 
        )         
    }
        catch(err){
          res.status(400).send("Error occurred : "  + err.message);
        }
    });
userRouter.get("/user/connections" , userAuth , async(req,res)=>{
 try{ 
    const loggedInUser = req.user;
    const connections = await ConnectionRequestModel.find({
        status : "accepted",
        $or:[
        {toUserId : loggedInUser._id},
        {fromUserId :loggedInUser._id }
        ]
    }).populate("fromUserId" , "firstName lastName photoUrl age gender skills ")
    .populate("toUserId" , "firstName lastName photoUrl age gender skills ");

    const data = connections.map((x)=>
       loggedInUser._id.toString() === x.fromUserId.toString() ? x.toUserId : x.fromUserId);
  
    if(!connections){
   return res.status(404).send({
        message:"No connections exists."
    })
  }
  
    res.send({
        message : "Connections fetched successfully" ,
       data : data
    })

}catch(err){
        res.status(400).send("Error occurred : "  + err.message);
      }
})
userRouter.get("/feed" ,userAuth ,async(req,res)=>{

    try{

        

    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }

})
    module.exports = userRouter;