const validator = require('validator');
const userModel = require('../models/userModel');

// Register a new user with email validation
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
                error: 'Invalid email format. Please provide a valid email address (e.g., user@example.com).' 
            });
        }

    
    } catch (err) {
        
    }
};

// Authenticate a user with email validation
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
                error: 'Invalid email format. Please provide a valid email address (e.g., user@example.com).' 
            });
        }


    } catch (err) {
        
    }
};

