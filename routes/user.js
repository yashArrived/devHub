

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
console.log(connections);

    const data = connections.map((x)=>
       loggedInUser._id.toString() === x.fromUserId._id.toString() ? x.toUserId : x.fromUserId);
  console.log(data);
  
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
userRouter.get("/user/feed" ,userAuth ,async(req,res)=>{

    try{

        const loggedInUser = req.user;
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let skip = (page - 1 ) *limit;
        const requests = await ConnectionRequestModel.find({
            //not me
            //not my connections 
            
                    $or:[
                    {toUserId : loggedInUser._id },
                    {fromUserId : loggedInUser._id}
                    ]
             
            // not those whom i sent req
            //not those who sent me frnd req.


        }).select("toUserId fromUserId");
        
        let hiddenUsers = new Set();

        requests.forEach((user) => {
            hiddenUsers.add(user.fromUserId);
            hiddenUsers.add(user.toUserId);
        })
        hiddenUsers = Array.from(hiddenUsers)
        const users = await User.find({
                _id : {$nin : hiddenUsers}

        }).select("fromUserId , firstName lastName photoUrl age gender skills ").skip(skip).limit(limit)
        
        res.send({
            data :users
        })


    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }

})
    module.exports = userRouter;