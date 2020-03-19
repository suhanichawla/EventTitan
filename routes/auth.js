var express=require("express")
const router=express.Router()

const db=require("../models")
signin=async function(req,res,next){
    try{
        let {username,password}=req.body;
        let user=await db.User.findOne({username:username})
        let isMatch=await user.comparePassword(password)
       if(isMatch){
            return res.status(200).json({
                id:user.id,
                username:user.username,
                profilePic:user.profilePic,
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
signup=async function(req,res,next){
    try{
        let user=await db.User.create(req.body)
        let {id,username,profilePic}=user
        return res.status(200).json({
            id,
            username,
            profilePic,
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


router.post("/signup",signup)
router.post("/signin",signin)

module.exports=router