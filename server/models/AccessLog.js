const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'DENIED']
  }
}, { timestamps: true });

module.exports = mongoose.model('AccessLog', accessLogSchema);