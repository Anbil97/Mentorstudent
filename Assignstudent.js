const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Mentor = require('../models/mentor');

router.post('/assign-student-to-mentor/:mentorId/:studentId', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    const student = await Student.findById(req.params.studentId);
    
    if (!mentor || !student) {
      return res.status(404).json({ error: 'Mentor or Student not found' });
    }

    mentor.students.push(student._id);
    await mentor.save();

    student.mentor = mentor._id;
    await student.save();

    res.json({ message: 'Student assigned to mentor successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
