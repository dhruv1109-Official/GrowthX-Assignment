const assignments = require("../models/assignment");

//function for getting assignments for an admin
exports.getAssignments = async (req, res) => {
  //fetching user(payload) from auth function
  const { user } = req;
  const { username } = user;
  try {
    //getting assignments assigned to a particular admin
    const getAssignments = await assignments.find({ admin: username });
    if (getAssignments) {
      //sending a list of objects as a response
      res.status(200).send([getAssignments]);
    }
  } catch (e) {
    res.status(500).send("Error Fetching Data", e.message);
  }
};

//function for accepting assignment
exports.acceptAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    //finding using assignment Id And updating the status to accepted
    await assignments.findOneAndUpdate(
      { assignmentId: id },
      { status: "accepted" }
    );
    res.send({ message: "Assignment Accepted" });
  } catch (e) {
    res.status(500).send("Assignment Accepting failed", e.message);
  }
};

//function for rejecting assignment
exports.rejectAssignment = async (req, res) => {
  // fetching assignment id from params
  const { id } = req.params;
  try {
    //finding using assignment Id And updating the status to rejected
    await assignments.findOneAndUpdate(
      { assignmentId: id },
      { status: "rejected" }
    );
    res.send({ message: "Assignment Rejected" });
  } catch (e) {
    res.status(500).send("Assignment Rejection Failed");
  }
};
