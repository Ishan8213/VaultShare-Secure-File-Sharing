const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   try {
//     const { username, password, role, department } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       username,
//       password: hashedPassword,
//       role,
//       department
//     });

//     res.json({ message: "User registered" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.register = async (req, res) => {
  try {
    const { username, password, role, department } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      role,
      department,
      status: 'pending'
    });

    res.json({ message: "Registration submitted. Await admin approval ⏳" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    if (user.status !== 'approved') {
      return res.status(403).json({
        message: "Your account is pending admin approval ⏳"
      });
    }

    const normalizedRole = String(user.role || '').toLowerCase();
    const token = jwt.sign(
      { id: user._id, role: normalizedRole, department: user.department },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ token, role: normalizedRole });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPendingUsers = async (req, res) => {
  const users = await User.find({ status: 'pending' });
  res.json(users);
};

exports.approveUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    status: 'approved'
  });

  res.json({ message: "User approved ✅" });
};