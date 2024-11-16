const mongoose = require('mongoose');
const uuid=require("short-uuid")


//Schema for Assignments
const assignmentSchema = new mongoose.Schema({
  assignmentId:{type:String,default:uuid.generate()},  //short-uuid is used for generating new IDs
  userId:{type:String,required:true},
  task: { type: String, required: true },
  admin: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },  //enum restricts user from giving irrelevant inputs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
