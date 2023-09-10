const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
