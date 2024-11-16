const express = require("express");
const {
  register,
  login,
  uploadAssignment,
  getAllAdmins,
} = require("../controllers/userController");
const auth = require("../auth");

const router = express.Router();

//user routes
router.post("/register", register); //for registering a user(admin/user based on role provided)
router.post("/login", login); //for login a user(admin/user based on role provided)
router.post("/upload", auth("user"), uploadAssignment); //for uploading document as a user
router.get("/admins", auth("user"), getAllAdmins); //for getting all admins

module.exports = router;
