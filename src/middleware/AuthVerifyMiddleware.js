let jwt = require("jsonwebtoken");

module.exports=(req,res,next)=>{
    let Token=req.headers["token"];
    jwt.verify(Token,"SecretKey1234",function(err,decoded){
        if(err){
            res.status(401).json({status:"unauthorized"})
        }
        else{
            let email=decoded["data"]
            req.headers.email=email;
            next();
        }
    })
}