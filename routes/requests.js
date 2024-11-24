const express = require("express");
const {userAuth} = require("../middlewares/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const { findUserById } = require("../utils/findUserById");
const requestRouter = express.Router();
// const { findUserById } = require("find-user-by-id");
const User = require("../models/User")



requestRouter.post("/request/send/:status/:toUserId",userAuth , async(req,res)=>{

try{
    const status = req.params.status;
const toUserId = req.params.toUserId;
const fromUserId = req.user._id;

const Allowed_status = ["ignored" , "interested"];
if(!Allowed_status.includes(status)){
        return res.status(400).json({
            message : "Invalid status type",
            status : status
        })
}
const toUser = await findUserById(User,toUserId); //Custom function

if(fromUserId.equals(toUserId)){
    return res.status(400).json({
        message : "You cannot send connection request to yourself",
         
    })
}


if(!toUser){
    return res.status(404).send({
        message : "User not found !!"
    })
}
const toUserFname = toUser.firstName;
const toUserLname = toUser.lastName;

const isToReqValid = await ConnectionRequestModel.findOne({ 
    
    $or : [
    {fromUserId, toUserId},
    { fromUserId: toUserId, toUserId: fromUserId }
    ]
});
console.log(isToReqValid);

if(isToReqValid){
    throw new Error("Connection request exists  " )
} 
if(!isToReqValid){
const connectionReq = new ConnectionRequestModel({
    fromUserId,
    toUserId,
    status,
})
const data = await connectionReq.save();

res.status(200).json({
    message: "Connection request sent successfully to " + toUserFname + " " + toUserLname,
    data: data
})

}

}catch(err){
    res.status(400).send("Error : " + err.message);
}

})
requestRouter.post("/request/review/:status/:requestId" , userAuth , async(req,res)=>{

       try
       {
         const loggedInUser = req.user;
        const status = req.params.status;
        const requestId = req.params.requestId;
    const ALLOWED_STATUS = ["accepted" , "rejected"];
    const isAllowed = ALLOWED_STATUS.includes(status);
    if(!isAllowed){
            return res.status(400).send({
                message : "Status not acceptable."
            });

    }

    // yash => virat

    //loggedin - virat : toId should be eq to loggedinUserId
    const connectionReq = await ConnectionRequestModel.findOne({
        _id : requestId ,
        toUserId : loggedInUser._id,
        status : "interested",
    })
     if(!connectionReq){
        return res.status(404).send({
            message : "Connection Request not found."
        });
     }

     connectionReq.status = status;
     const data = await connectionReq.save();
     
     res.send({
        message : "Connection Request " , status , data : data
     })
    }
catch(err){
    res.status(400).send("Error : " + err.message);
}
})
module.exports = requestRouter;