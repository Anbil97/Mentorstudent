const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');

router.post('/mentors', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
