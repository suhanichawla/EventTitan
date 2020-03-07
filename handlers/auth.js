const db=require("../models")
const jwt=require("jsonwebtoken")

exports.signin=async function(req,res,next){
    try{
        let {username,password}=req.body;
        let user=await db.User.findOne({username:username})
        let isMatch=await user.comparePassword(password)
       if(isMatch){
            let token=jwt.sign({
                id:user.id,
                username:user.username,
                profilePic:user.profilePic
            },process.env.SECRET_KEY)
            return res.status(200).json({
                id:user.id,
                username:user.username,
                profilePic:user.profilePic,
                token
            })
       }else{
           next({
            status:400,
            message:"Incorrect username or password"
           })
       }
    }catch(err){
        return next({
            status:400,
            message:"Incorrect username or password"
        })
    }
}
exports.signup=async function(req,res,next){
    try{
        let user=await db.User.create(req.body)
        let {id,username,profilePic}=user
        let token=jwt.sign({
            id,
            username,
            profilePic
        },process.env.SECRET_KEY)
        return res.status(200).json({
            id,
            username,
            profilePic,
            token
        })
    }catch(err){
        if(err.code===11000){
            err.message="Sorry that username is taken and/or email is taken"
        }
        return next({
            status:400,
            message:err.message
        })
    }
}