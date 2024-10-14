const mongoose =require('mongoose');


const UserSchema=mongoose.Schema({
    fullName:{
       type:String,
       required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    ProfilePic:{
        type:String,
        default:"/images/deafult.png",
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:"USER",
    }
},{timestamps:true})

module.exports=mongoose.model('user',UserSchema);