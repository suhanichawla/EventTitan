var express=require("express")
const router=express.Router({mergeParams:true})
const {createMessage,getMessage,deleteMessage}=require("../handlers/messages")

//url- /api/users/:id/messages

router.route("/").post(createMessage)

router.route("/:message_id")
      .get(getMessage)
      .delete(deleteMessage);


module.exports=router