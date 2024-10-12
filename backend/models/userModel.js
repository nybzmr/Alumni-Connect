const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: Date,
  currentInstitution: [String],
  previousInstitutions: [String],
  achievements: [String],
  experience: [String],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
