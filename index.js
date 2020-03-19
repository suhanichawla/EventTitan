require("dotenv").config();
var express=require("express")
var app=express()
// var bcrypt=require("bcrypt")
var bodyParser=require("body-parser")
var cors=require("cors")
var authRoutes=require("./routes/auth")
var eventRoutes=require("./routes/events")
var errorHandler=require("./handlers/error")
var db=require("./models")
// const {loginRequired,correctUser}=require("./middleware/auth")
const port=process.env.PORT || 8080;


app.use('/',express.static('public'))
app.use(cors())
app.use(bodyParser.json())


app.use("/api/auth",authRoutes)
app.use("/api/users/:id/events",eventRoutes)


app.get("/api/events",async function(req,res,next){
    try{
        let events=await db.Event.find()
        .sort({createdAt:"desc"})
        .populate("user",{
            username:true,
        })
        return res.status(200).json(events)
    }catch(e){
        return next(e)
    }
})

app.use((req,res,next)=>{
    let err=new Error("NOT FOUND")
    err.status=404
    next(err)
})

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`SERVER STARTED ON ${port}`)
})
