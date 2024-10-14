const {Router}=require('express')
const bcrypt=require('bcrypt');
const router=Router();
const UserModel=require('../models/user')
const jwt=require('jsonwebtoken')

router.get('/signup',async function(req,res){
    res.render('signup');
})
router.post('/signup',async function(req,res){
    const {fullname,email,password}=req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
           const user= await UserModel.create(
           {fullName:fullname,
            email,
            password:hash
           }).then(()=>{return res.redirect('/user/signin');}).catch(()=>{return res.render('signup',{err:"Something Went Wrong"})});
        
        });
    });
    
})

router.get('/signin',function(req,res){
    res.render('signin');
})
router.post('/signin',async function(req,res){
    const user= await UserModel.findOne({email:req.body.email});
    if(!user) return res.render('signin',{err:"Something Went Wrong"});
    try {
        bcrypt.compare(req.body.password,user.password, function(err, result) {
           if(result){
            var token = jwt.sign({ name:user.fullName,email:user.email,ProfilePic:user.ProfilePic,role:user.role,userId:user._id }, 'shhhhh');
            res.cookie("token",token);
            res.redirect(`/`);
           }
           else{
            res.render('signin',{err:"Invalid Email or password"})
           }
        });
    } catch (error) {
        console.log(error);
    }
     
})
router.get('/logout',function(req,res){
    res.cookie('token',"");
    res.redirect('/');
})






module.exports=router;