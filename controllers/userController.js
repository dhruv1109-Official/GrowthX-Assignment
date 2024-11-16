const user = require("../models/user");
const assignment = require("../models/assignment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//function for registering (admin/user)
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  //Check for Empty fields
  if (!username || !password || !role) {
    res.status(400).send("All Fields Are Required");
  } else {
    //Encrypting Password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      username,
      password: hashedPassword,
      role,
    });
    //Saving new user in Mongo DB
    const addUser = await newUser.save();

    if (addUser) {
      res.status(201).send("User Registered Successfully");
    } else {
      res.status(400).send("Error Creating User");
    }
  }
};

//function for login (admin/user)
exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  //Check for Empty fields
  if (!username || !password || !role) {
    res.status(400).send("All Fields Are Required");
  } else {
    //finding user document associated with the username
    const checkUser = await user.findOne({ username });

    if (checkUser) {
      //if user found then password is compared from the document and the user input
      const checkPassword = await bcrypt.compare(password, checkUser.password);

      if (checkPassword) {
        //payload for jwt
        const payload = {
          username,
          password,
          role,
        };
        //Creating JWT Token
        const jwtToken = jwt.sign(payload, "abcdefg");
        res.status(200).send({ jwtToken });
      } else {
        //Error for Invalid Password
        res.status(401).send({message:"Invalid Password"});
      }
    } else {
      //Error for Invalid Username
      res.status(401).send({message:"User Not Found! Check The Inputs"});
    }
  }
};

exports.uploadAssignment = async (req, res) => {
  const {userId, task, admin} = req.body;
    //new Assignment created
    const newAssignment=new assignment({userId,task,admin})
    try{
    //new Assignment saved
    const addAssignment=newAssignment.save()
    if (addAssignment){
        res.status(201).send({message:"Assignment Uploaded"})
    }else{
      //error for Assignment Upload failure
        res.status(500).send("Error Uploading the Assignment")
    }
}catch(e){
  //error for Assignment Creation and upload Failure
    res.status(500).send("Error",e.message)
}
};

exports.getAllAdmins = async (req, res) => {
try{
    //fetching user documents where role is admin
    const getAdmins=await user.find({role:"admin"})
    if (getAdmins.length>0){
      // sending list of objects(documents) containing admins
        res.status(200).send([getAdmins])
    }else{
        res.status(200).send({message:"No admins"}) 
    }
}catch(e){
    //error for admin fetching
    res.status(500).send("Error Finding Admins",e.message)
}
  };
  
