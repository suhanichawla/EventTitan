const mongoose=require("mongoose")
const User=require("./user")

const eventSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true,
        maxlength:150
    },
    date:{
        type:Date,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    organisation:{
        type:String,
        required:true
    },
    starttime:{
        type:String,
        required:true
    },
    endtime:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }},
    {
        timestamps:true
    }
)

eventSchema.pre("remove",async function(next){
    try{
        let user=await User.findById(this.user);
        user.events.remove(this.id)
        await user.save();
        return next();
    }catch(e){
        return next(e)
    }
})

const Events=mongoose.model("Events",eventSchema)
module.exports=Events