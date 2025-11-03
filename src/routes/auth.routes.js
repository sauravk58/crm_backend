const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../validators/auth.validator');
const { validate } = require('../middlewares/validation.middleware');
const { authenticate } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', registerValidator, validate, AuthController.register);
router.post('/login', loginValidator, validate, AuthController.login);

// Protected routes
router.get('/profile', authenticate, AuthController.getProfile);

module.exports = router;