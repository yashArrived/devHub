// Purpose: User model schema for the database.
const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
        firstName :{
            type : String,
            required : true, //no insertion will occur to db if this field is not present
            trim : true,
   
        } ,
        lastName : {
            type : String 
        },
        email :{
            type : String,
            lowercase : true,
            trim : true,
            required : true,
            unique : true,
            validate(value){
                        if(validator.isEmail(value) === false){
                            throw new Error("Invalid Email Id");
            }
        
        }} ,
        password : {
            type : String ,
            required : true,
            minLength : 7
        },
        age : {
            type : Number,
            min : 16 
        }, 
        gender:{
            type: String,
            validate(value){
                            if(!["male" ,"female" , "other"].includes(value.toLowerCase())){
                                throw new Error("Invalid Gender"); 
                            }   
        },
        // lowercase : true,
    },
        photoUrl : {
            type : String,
            default : "https://www.vhv.rs/dpng/d/561-5617462_hurt-user-profile-image-dummy-hd-png-download.png",
            validate(value){
                if(validator.isURL(value) === false){
                    throw new Error("Invalid Photo URL");
    }
        }},
        about : {
            type : String,
            default : "Hey there! I am using DevHub"
        },  
        skills : {
            type : [String]
        },
         
},
 {    timestamps : true});

module.exports = mongoose.model("User", UserSchema);

 