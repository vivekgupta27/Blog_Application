const {Router}=require('express')
const router=Router();
const multer=require('multer');
const path=require('path');
const CommentModel=require('../models/comment')
const BlogModel=require('../models/blog')
const {AuthenticateCookie}=require('../middleware/auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const filename=`${Date.now()}-${file.originalname}`;
      cb(null,filename);
    }
  })
  
  const upload = multer({ storage: storage })


router.get('/add-new',(req,res)=>{
    return res.render('addblog',{user:req.user});
})

router.get('/:id', async (req,res)=>{
    const blog= await BlogModel.findOne({_id:req.params.id}).populate("createdBy");
    const comments=await CommentModel.find({}).populate("createdBy");
    return res.render('blog',{user:req.user,blog,comments});
})

router.post('/comment/:blogId',async (req,res)=>{
    await CommentModel.create({
      content:req.body.comment,
      blogId:req.params.blogId,
      createdBy:req.user.userId,
    })
    res.redirect(`/blog/${req.params.blogId}`)
})

router.post('/',upload.single('coverImage'),async (req,res)=>{
    const {title,body}=req.body
    await BlogModel.create({
           title,
           body,
           createdBy:req.user.userId,
           coverImage:`/uploads/${req.file.filename}`,
    })
    res.redirect('/');
})

router.get('/like/:id',async (req,res)=>{
       
       const blog=await BlogModel.findOne({_id:req.params.id});
      
      if(!req.user){
        return res.redirect('/user/signin');
      }
       if(blog.Like.indexOf(req.user.userId)===-1){
        blog.Like.push(req.user.userId);
            await blog.save();
       }
     
      return  res.redirect('/');
})









module.exports=router;