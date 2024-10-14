const jwt=require('jsonwebtoken');

function AuthenticateCookie(req,res,next){
    const token=req.cookies.token;
    if (!token) {
        return next();
    }
    
    try {
        var user = jwt.verify(token, 'shhhhh');
        req.user=user;
      } catch(err) {
        console.log(err);
      }
     next();
}

module.exports={AuthenticateCookie};