const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config({
    path:  process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', authRoutes);

module.exports = app; 