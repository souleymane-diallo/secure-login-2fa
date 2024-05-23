const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/authRoutes');
const db = require('./models/userModel');

dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', authRoutes);

// Route de test
app.get('/', (req, res) => {
    res.send('Secure Login 2FA WIP!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});