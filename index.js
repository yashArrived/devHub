// const { log } = require("console");
// const express = require("express");
const express = require("express")
const dbConnect = require("./config/database")
const http = require("http")
const cookieParser = require("cookie-parser")
const User  = require("./models/User")
const app = express();
// require("./config/database");
const cors = require("cors")

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
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



const server = http.createServer(app);
const socket = require("socket.io");
const initialiseSocket = require("./utils/socket")

initialiseSocket(server)
//Database connection
dbConnect().then(()=>
{
    console.log("connected to db");
    server.listen(3000 , ()=>{
        console.log("running on 3000");
        
    });
    

    
}).catch((err)=>{
    console.log(err); 
    
})


