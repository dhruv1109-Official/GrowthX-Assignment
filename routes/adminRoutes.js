const express = require('express');
const { getAssignments ,acceptAssignment,rejectAssignment} = require('../controllers/adminController');
const auth = require('../auth');

//router instance
const router = express.Router();

//admin routes
router.get('/assignments', auth('admin'), getAssignments);   //getting assignments assigned to an admin
router.post('/assignments/:id/accept', auth('admin'), acceptAssignment);  //for accepting an assignment 
router.post('/assignments/:id/reject', auth('admin'), rejectAssignment);  //for reject an assignment 

module.exports = router;
