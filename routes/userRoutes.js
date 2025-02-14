const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { validateRegistration, validateLogin } = require('../middleware/validation');

// Public routes
router.post('/register', validateRegistration, userController.register);
router.post('/login', validateLogin, userController.login);
router.get('/search', userController.searchUsers);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.put('/update', auth, userController.updateUser);
router.delete('/delete', auth, userController.deleteUser);

module.exports = router;