const File = require('../models/File');
const AccessLog = require('../models/AccessLog');
const { encrypt, decrypt } = require('../utils/CryptoUtil');
const { checkAccess } = require('../utils/AbeUtil');

// exports.uploadFile = async (req, res) => {
//   try {
//     const { content, role, department } = req.body;

//     const { encryptedData, key } = encrypt(content);

//     const file = await File.create({
//       filename: "file.txt",
//       encryptedData,
//       key,
//       requiredRole: role,
//       requiredDepartment: department,
//       uploadedBy: req.user.id
//     });

//     res.json({ message: "File uploaded" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    const { role, department, message } = req.body;
    const user = req.user;

    if (!message && !req.file) {
      return res.status(400).json({
        message: "Please provide a message or file ❌"
      });
    }

    if (user.role === "Employee" && user.department !== department) {
      return res.status(403).json({
        message: "Employees can only send to their department ❌"
      });
    }

    await File.create({
      filename: req.file ? req.file.originalname : null,
      filePath: req.file ? path.join('uploads', req.file.filename) : null,
      requiredRole: role.toLowerCase(),
      requiredDepartment: department.toLowerCase(),
      message: message || "",
      uploadedBy: user.id
    });

    res.json({ message: "Content shared successfully ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found ❌" });
    }

    const user = req.user;
    const isAdmin = String(user.role || '').toLowerCase() === "admin";
    const isOwner = file.uploadedBy.toString() === user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        message: "You can only access your own files ❌"
      });
    }

    if (file.filePath) {
      return res.download(path.resolve(file.filePath), file.filename);
    }

    return res.json({ message: file.message });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find().select('-encryptedData -key');
    res.json(files);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📁 Get Files Uploaded by Logged-in User
exports.getMyFiles = async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.id })
      .select('-encryptedData -key')
      .populate('uploadedBy', 'username');

    res.json(files);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};