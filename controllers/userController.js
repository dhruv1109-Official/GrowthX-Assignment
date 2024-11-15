const user = require("../models/user");
const assignment = require("../models/assignment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    res.status(400).send("All Fields Are Required");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      username,
      password: hashedPassword,
      role,
    });
    const addUser = await newUser.save();

    if (addUser) {
      res.status(201).send("User Registered Successfully");
    } else {
      res.status(400).send("Error Creating User");
    }
  }
};

exports.login = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    res.status(400).send("All Fields Are Required");
  } else {
    const checkUser = await user.findOne({ username });
    if (checkUser) {
      const checkPassword = await bcrypt.compare(password, checkUser.password);
      if (checkPassword) {
        const payload = {
          username,
          password,
          role,
        };
        const jwtToken = jwt.sign(payload, "abcdefg");
        res.status(200).send({ jwtToken });
      } else {
        res.status(401).send("Invalid Password");
      }
    } else {
      res.status(401).send("User Not Found! Check The Inputs");
    }
  }
};

exports.uploadAssignment = async (req, res) => {
  const {userId, task, admin} = req.body;
    const newAssignment=new assignment({userId,task,admin})
    try{
    const addAssignment=newAssignment.save()
    if (addAssignment){
        res.status(201).send("Assignment Uploaded")
    }else{
        res.status(500).send("Error Uploading the Assignment")
    }
}catch(e){
    res.status(500).send("Error",e.message)
}
};

exports.getAllAdmins = async (req, res) => {
try{
    const getAdmins=await user.find({role:"admin"})
    if (getAdmins.length>0){
        res.status(200).send([getAdmins])
    }else{
        res.status(204).send("No Admins") 
    }
}catch(e){
    res.status(500).send("Error Finding Admins",e.message)
}
  };
  
