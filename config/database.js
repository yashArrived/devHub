const mongoose = require("mongoose");

const dbConnect = async()=>{
    await mongoose.connect("mongodb+srv://yash:tiwari@cluster0.uj9zl7s.mongodb.net/devHub" );
}

module.exports = dbConnect ; 