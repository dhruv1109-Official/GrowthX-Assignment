const assignments=require("../models/assignment")

exports.getAssignments= async (req,res)=>{
    const {user}=req
    const {username}=user
    try{
    const getAssignments=await assignments.find({admin:username})
    if (getAssignments){
        res.status(200).send([getAssignments])
    }
    }catch(e){
        res.status(500).send("Error Fetching Data",e.message)
    }
}