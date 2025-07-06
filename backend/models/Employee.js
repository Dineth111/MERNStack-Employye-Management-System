const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  position: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true,
    min: [0, 'Salary must be positive.']
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema); 