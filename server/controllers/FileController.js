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

exports.uploadFile = async (req, res) => {
  try {
    const { content, role, department, message } = req.body;

    const user = req.user;

    // 🔒 RULES:
    // Manager → can send to ANY department
    // Employee → can ONLY send to their own department

    if (user.role === "Employee" && user.department !== department) {
      return res.status(403).json({
        message: "Employees can only send files to their own department ❌"
      });
    }

    const { encryptedData, key } = encrypt(content);

    await File.create({
      filename: "file.txt",
      encryptedData,
      key,
      requiredRole: role,
      requiredDepartment: department,
      message,
      uploadedBy: user.id
    });

    res.json({ message: "File uploaded with secure policy ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ message: "File not found" });

    const hasAccess = checkAccess(req.user, file);

    await AccessLog.create({
      user: req.user.id,
      file: file._id,
      status: hasAccess ? "SUCCESS" : "DENIED"
    });

    if (!hasAccess) {
      return res.status(403).json({ message: "Access Denied ❌" });
    }

    const decrypted = decrypt(file.encryptedData, file.key);

    res.json({ data: decrypted });

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