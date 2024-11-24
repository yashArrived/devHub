// const { log } = require("console");
const express = require("express");
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser")
const User  = require("./models/User")
const app = express();
// require("./config/database");



app.use(express.json()); // middlweware to parse json data, this should be above the routes, GIVEN TO US BY EXPRESS, 
app.use(cookieParser()); // middleware to parse cookie so that it becomes readable


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/" , userRouter)


//Database connection
dbConnect().then(()=>
{
    console.log("connected to db");
    app.listen(3000 , ()=>{
        console.log("running on 3000");
        
    });
    

    
}).catch((err)=>{
    console.log(err); 
    
})


