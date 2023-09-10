const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');

router.get('/mentor-students/:mentorId', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate('students');
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    res.json(mentor.students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
