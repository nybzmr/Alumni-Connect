const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173',  // URL of your frontend
//   methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],  // Allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
//   credentials: true,  // Allow credentials (cookies, etc.)
// }));

// // Handle preflight requests (OPTIONS)
// app.options('*', cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));

app.use(cors(
  {
      origin:'*',
      credentials: true
  }))
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
