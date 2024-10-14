const mongoose=require('mongoose');

const BlogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    Like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }]
},{timestamps:true})


module.exports=mongoose.model('blog',BlogSchema);