const express = require('express');
const User = require('../models/userModel');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get user profile
router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

// Update user profile
router.patch('/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'dob', 'currentInstitution', 'previousInstitutions', 'achievements', 'experience'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send('Invalid updates');

  try {
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
});

module.exports = router;
