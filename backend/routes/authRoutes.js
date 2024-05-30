const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-2fa', authController.verify2FA);
router.get('/user/:id', auth, authController.getUser);

module.exports = router;
