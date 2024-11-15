const express = require('express');
const { register,login,uploadAssignment,getAllAdmins} = require('../controllers/userController');
const auth = require('../auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload',auth("user"), uploadAssignment);
router.get('/admins',auth("user"), getAllAdmins);

module.exports = router;
