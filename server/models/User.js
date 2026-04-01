const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'Employee'],
    default: 'Employee',
    required: true
  },
  department: {
    type: String,
    enum: ['Finance', 'HR', 'IT'],
    required: true
  },
  status: {
  type: String,
  enum: ['pending', 'approved'],
  default: 'pending'
}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);