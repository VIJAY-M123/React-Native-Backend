const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {type : String },  //required:true
    email : { 
        type : String,
        unique : true,
    },
    password : {type : String},
}
)


const UserModel = mongoose.model("UserData",userSchema)

module.exports = UserModel;