const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', authRoutes);

// Route de test
app.get('/', (req, res) => {
    res.send('Secure Login 2FA WIP!');
});

module.exports = app; 