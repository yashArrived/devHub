// const { log } = require("console");
const express = require("express");

const dbConnect = require("./config/database");
const app = express();
require("./config/database");
const User  = require("./models/User")

app.use(express.json());
app.post("/signUp" , async(req,res)=>{
    const userObj = new User(req.body);
    try{
    await userObj.save();
    res.send("ok")
    }
    catch(err){
                res.status(400).send("Error");
    }
});

//Get all the users from db

app.get("/feed" , async(req,res)=>{
try{
const users = await User.find({});
res.send(users);
}
catch (err){
    res.status(400).send("Something went wrong");
}
})


dbConnect().then(()=>
{
    console.log("connected to db");
    app.listen(3000 , ()=>{
        console.log("running on 3000");
        
    });

    
}).catch((err)=>{
    console.log(err);
    
})


