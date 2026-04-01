const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/AuthRoutes');
const fileRoutes = require('./routes/FileRoutes');

const app = express();

// 🔧 Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// 🔗 Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// 🧪 Test Route
app.get('/', (req, res) => {
  res.send("NIS Secure File Sharing API is running 🚀");
});

// 🗄️ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/nis-secure-file-sharing', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// 🚀 Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});