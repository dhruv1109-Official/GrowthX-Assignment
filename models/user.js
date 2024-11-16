const mongoose = require("mongoose");

//Schema for user(admin/user where username is unique)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true }, //enum restricts user from giving irrelevant inputs
});

const userDetails = mongoose.model("User", userSchema);

module.exports = userDetails;
