const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors=require("cors")
const adminRoute = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express(); 


//middleware for parsing JSON Input Data
app.use(express.json());  

//middleware for Cross-origin resource sharing 
app.use(cors()) 

//for .env configuration
dotenv.config(); 

// Connected MongoDB using Atlas Cluster and URI is stored in env file
const mongoURI = `${process.env.MONGODB_URL}`;
const ConnectDBAndInitialiseServer = async () => {
  try {

    //Mongo DB Connection
    await mongoose.connect(mongoURI);
    console.log("DB Connected");

    //using PORT stored in .env file if not found will use default port 5000
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log("Server Listening at Port 3000");
    });

  } catch (e) {
    console.log("Error", e.message);
  }
};

//set up route prefixes for user Management
//for user routes {for example:http://localhost:3000/user/login}
app.use("/user", userRoutes);

// for admin routes  {for example:http://localhost:3000/admin/assignments}
app.use("/admin", adminRoute); 


ConnectDBAndInitialiseServer();
