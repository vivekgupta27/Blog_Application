const express=require('express');
const path=require('path');
const userRoute=require('./routes/userRoutes');
const BlogRoutes=require('./routes/blogRoutes');
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const {AuthenticateCookie}=require('./middleware/auth')
const Blog=require('./models/blog')
const app=express();
const PORT=4000;
app.use(express.static(path.resolve(`./public`)));
app.set("view engine","ejs");
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(AuthenticateCookie);

mongoose.connect('mongodb://127.0.0.1:27017/Blogify').then(()=>console.log('Server is Working'));
app.use('/user',userRoute);
app.use('/blog',BlogRoutes);
app.get('/',async (req,res)=>{
    const allBlog=await Blog.find({});
    res.render("home",{user:req.user,blogs:allBlog});
})


app.listen(PORT,()=> console.log(`Server Started at PORT${PORT}`));