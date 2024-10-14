const mongoose=require('mongoose');


const CommentSchema=mongoose.Schema({
 
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog",
        required:true,
    },
    createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true}

},{timestamps:true})






module.exports=mongoose.model('comment',CommentSchema);