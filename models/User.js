const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
        firstName :{
            type : String
        } ,
        lastName : {
            type : String 
        },
        email :{
            type : String
        } ,
        password : {
            type : String 
        },
        age : {
            type : Number
        }
         
});

module.exports = mongoose.model("User", UserSchema);