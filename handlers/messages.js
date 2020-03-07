const db=require("../models")

exports.createMessage= async function(req,res,next){
    try{
        let message=await db.Message.create({
            text:req.body.text,
            //route will be: api/users/:id/messages
            user:req.params.id
        })
        let foundUser=await db.User.findById(req.params.id)
        foundUser.messages.push(message.id)
        await foundUser.save()
        let foundMessage=await db.Message.findById(message._id).populate("user",{
            username:true,
            profilePic:true
        })
        return res.status(200).json(foundMessage);

    }catch(e){
        return next(e);
    }
}
//api/users/:id/messages/:message_id
exports.getMessage= async function(req,res,next){
    try{
        let message=await db.Message.findById(req.params.message_id)
        return res.status(200).json(message)
    }catch(e){
        return next(e);
    }
}

exports.deleteMessage= async function(req,res,next){
    try{
        let found_message=await db.Message.findById(req.params.message_id)
        await found_message.remove();
        return res.status(200).json(found_message)
    }catch(e){
        return next(e);

    }
}