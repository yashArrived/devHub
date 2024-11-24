
const findUserById = async(UserModel , id)=>{
const user = UserModel.findById({_id : id});
return user;

}

module.exports = {
    findUserById,
}