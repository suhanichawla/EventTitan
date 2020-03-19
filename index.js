var express=require("express")
var app=express()
var bodyParser=require("body-parser")
var authRoutes=require("./routes/auth")
var eventRoutes=require("./routes/events")
var errorHandler=require("./handlers/error")
var db=require("./models")
const port=process.env.PORT || 8080;


app.use('/',express.static('public'))
app.use(bodyParser.json())

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


app.use("/api/auth",authRoutes)
app.use("/api/users/:id/events",eventRoutes)

app.use((req,res,next)=>{
    let err=new Error("NOT FOUND")
    err.status=404
    next(err)
})

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`SERVER STARTED ON ${port}`)
})
