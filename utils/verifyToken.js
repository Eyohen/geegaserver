const jwt = require("jsonwebtoken");
const {createError} = require("./error.js")


const verifyToken = (req, res,next) => {
    const cookieHeader = req.headers.cookie;
    const cookies = {};
    if (cookieHeader) {
      cookieHeader.split(';').forEach((cookie) => {
        const parts = cookie.split('=');
        const name = parts[0].trim();
        const value = parts[1].trim();
        cookies[name] = value;
      });
    }
  
    const token = cookies.access_token;
    // const token = req?.cookies?.access_token;

    console.log(req.headers.cookie)
    
    if(!token){
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) 
        return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

const verifyUser = (req,res,next) =>{
    verifyToken(req, res, next, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else{
            if(err) 
            return next(createError(403,"You are not authorized!!"));
        }
    })
}


const verifyAdmin = (req,res,next) =>{
    verifyToken(req, res, next, ()=>{
        if(req.user.isAdmin){
            next()
        } else{
            if(err) 
            return next(createError(403,"You are not admin!!"));
        }
    })
}


module.exports = {verifyToken, verifyUser, verifyAdmin}