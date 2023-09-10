const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Mentor = require('../models/mentor');

router.put('/assign-mentor-to-student/:studentId/:mentorId', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    const student = await Student.findById(req.params.studentId);
    
    if (!mentor || !student) {
      return res.status(404).json({ error: 'Mentor or Student not found' });
    }

    // Remove student from the previous mentor's list
    if (student.mentor) {
      const previousMentor = await Mentor.findById(student.mentor);
      previousMentor.students = previousMentor.students.filter(id => id.toString() !== student._id.toString());
      await previousMentor.save();
    }

    mentor.students.push(student._id);
    await mentor.save();

    student.mentor = mentor._id;
    await student.save();

    res.json({ message: 'Mentor assigned to student successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
