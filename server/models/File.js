const mongoose = require('mongoose');

// const fileSchema = new mongoose.Schema({
//   filename: String,
//   encryptedData: String,
//   key: String,

//   requiredRole: String,
//   requiredDepartment: String,

//   uploadedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, { timestamps: true });
const fileSchema = new mongoose.Schema({
  filename: String,
  encryptedData: String,
  key: String,

  requiredRole: String,
  requiredDepartment: String,

  message: {
    type: String,
    default: ""
  },
  filePath: {
    type: String,
    default: null
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });
module.exports = mongoose.model('File', fileSchema);