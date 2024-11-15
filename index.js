const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const bodyParser = require('body-parser');
const adminRoute=require('./routes/adminRoutes')
const userRoutes=require("./routes/userRoutes")
const app=express()

app.use(express.json())
app.use(bodyParser.json())
dotenv.config()
const mongoURI=`${process.env.MONGODB_URL}`
const ConnectDBAndInitialiseServer=async ()=>{
    try{
        await mongoose.connect(mongoURI)
        console.log("DB Connected")

        const port=process.env.PORT || 5000
        app.listen(port,()=>{
            console.log("Server Listening at Port 3000")
    })


    }catch(e){
        console.log("Error",e.message)
    }
}



//admin
app.use("/user",userRoutes)
app.use("/admin",adminRoute)

ConnectDBAndInitialiseServer()