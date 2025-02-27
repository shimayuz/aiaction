const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const mandalaRoutes = require('./routes/mandalaRoutes');
const taskRoutes = require('./routes/taskRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes');

const app = express();
const serverPort = 5002; // 明示的にポート番号を指定

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (開発環境ではスキップ可能)
if (process.env.NODE_ENV !== 'development') {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('Development mode: Skipping MongoDB connection');
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/mandala', mandalaRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/gamification', gamificationRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(serverPort, () => {
  console.log(`サーバーが起動しました: http://localhost:${serverPort}`);
});

module.exports = app; // For testing purposes
