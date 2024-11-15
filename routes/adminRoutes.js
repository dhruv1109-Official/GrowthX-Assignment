const express = require('express');
const { getAssignments } = require('../controllers/adminController');
const auth = require('../auth');

const router = express.Router();

router.get('/assignments', auth('admin'), getAssignments);
// router.post('/assignments/:id/accept', auth('admin'), acceptAssignment);
// router.post('/assignments/:id/reject', auth('admin'), rejectAssignment);

module.exports = router;
