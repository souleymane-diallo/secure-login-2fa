const validator = require('validator');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const bcrypt = require('bcryptjs');
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

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ 
                error: 'Password must be at least 6 characters long.' 
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = await userModel.createUser(email, hashedPassword);
        res.status(201).json({ message: "User registered successfully", user });
    
    } catch (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
            res.status(400).json({ error: "Email already in use. Please use a different email address." });
        } else {
            res.status(500).json({ error: "Internal server error. Please try again later." });
        }
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

        const user = await userModel.findUserByEmail(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ error: 'Invalid email or password. Please try again.' });
        }

        // If 2FA is not configured, generate and return QR code
        if (!user.is2FAConfigured) {
            // Generate new secret if not exists or not configured
            if (!user.secret) {
                const secret = speakeasy.generateSecret({ length: 20 });
                await userModel.updateUserSecret(user.id, secret.base32);
                user.secret = secret.base32; // Ensure user object has the secret
            }

            const otpauthUrl = speakeasy.otpauthURL({ secret: user.secret, label: `MyApp (${email})`, encoding: 'base32' });
            const qrCodeUrl = await qrcode.toDataURL(otpauthUrl);

            return res.json({ message: '2FA setup required', user: { id: user.id, email: user.email }, qrCodeUrl });
        } else {
            // If 2FA is configured, require 2FA token
            return res.json({ message: '2FA token required', user: { id: user.id, email: user.email } });
        }

    } catch (err) {
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

// Verify the 2FA token
exports.verify2FA = async (req, res) => {
    try {
        const { token, userId } = req.body;
        const user = await userModel.findUserSecretById(userId);

        if (!user) {
            return res.status(400).json({ error: 'User not found. Please provide a valid user ID.' });
        }

        const verified = speakeasy.totp.verify({
            secret: user.secret,
            encoding: 'base32',
            token: token,
            window: 2
        });

        if (verified) {
            await userModel.updateUser2FAConfigured(userId, 1);
            res.json({ verified: true });
        } else {
            res.status(400).json({ verified: false, error: 'Invalid 2FA token. Please try again.' });
        }

    } catch (err) {
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

// Get user information
exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found. Please provide a valid user ID.' });
        }

        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};