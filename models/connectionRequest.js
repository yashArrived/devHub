const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type : String,
            enum : {
                 values : ["ignore" , "interested" , "accepted" , "rejected"],
                 message : `{VALUE} is not supported`
    },
    required : true
    }

},{timestamps:true})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest" , connectionRequestSchema)

module.exports = {
    ConnectionRequestModel
}