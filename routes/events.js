var express=require("express")
const router=express.Router({mergeParams:true})

const db=require("../models")

//url- /api/users/:id/events
createEvent= async function(req,res,next){
    try{
        var {text,date,starttime,endtime,venue,name,organisation}=req.body
        let event=await db.Event.create({
            text,
            date,
            starttime,
            endtime,
            venue,
            name,
            organisation,
            //route will be: api/users/:id/events
            user:req.params.id
        })
        let foundUser=await db.User.findById(req.params.id)
        foundUser.events.push(event.id)
        await foundUser.save()
        let foundEvent=await db.Event.findById(event._id).populate("user",{
            username:true,
            profilePic:true
        })
        return res.status(200).json(foundEvent);

    }catch(e){
        return next(e);
    }
}
//api/users/:id/events/:event_id

deleteEvent= async function(req,res,next){
    try{
        let found_event=await db.Event.findById(req.params.event_id)
        await found_event.remove();
        return res.status(200).json(found_event)
    }catch(e){
        return next(e);

    }
}
getEvent= async function(id){
    try{
        let event=await db.Event.findById(id);
        //console.log(event);
        return event;
    }catch(e){
        console.log(e);
    }
}

viewEvents=async function(req,res,next){
    try{
        let foundUser=await db.User.findById(req.params.id);
        let rlist=await getList(foundUser.events);
        return res.status(200).json(rlist);
    }catch(e){
        return next(e);

    }
}

getList=async function(arr){
    return Promise.all(arr.map(item => getEvent(item)))
}

router.route("/")
.post(createEvent)
.get(viewEvents);

router.route("/:event_id")
.delete(deleteEvent);


module.exports=router