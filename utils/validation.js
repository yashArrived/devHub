const validator = require("validator");
const bcrypt = require("bcrypt")
 

const validateUser = (req)=> {
    const data = req.body;
    const{firstName , email,password } = data;

    if(!firstName){
        throw new Error ("Enter First Name");
    }
    // const isEmailValid = validator.isEmail(email);
    // if(!isEmailValid){
    //     throw new Error ("Enter correct email");
    // }
    const ispwdValid = validator.isStrongPassword(password);
    if(!ispwdValid){
        throw new Error ("Enter a strong password");
    }

    
}
const hashpassword = async(req) => {
    const data = req.body;
    const{ password } = data;
        const hashpwd = await bcrypt.hash(password,10);
        console.log(hashpwd);
        
        return hashpwd;
}
module.exports = { 
    validateUser,
    hashpassword,
};
