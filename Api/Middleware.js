const jwt=require('jsonwebtoken')
const verifyToken=(req,res,next)=>{
  const authHeader=req.headers.token
  if(authHeader)
  {
    jwt.verify(token,process.env.TOKEN_KEY,(err,user)=>{
      if(err)
      res.status(403).json("Token is Not Valid");
      req.user=user;
      next(); 
    })
  }
  else{
      return res.status(403).json({
        message:"You Are not Authenticated"
      })
  }
};
const verifyTokenandAuthorization=()=>{
  verifyToken(req,res,()=>{
    if(req.user.id==req.params.id||req.user.isAdmin)
    {
      next()
    }
    else{
      res.status(403).json("You Are Not Allowed to Do That")
    }
  })
}
module.exports={verifyToken,verifyTokenandAuthorization}