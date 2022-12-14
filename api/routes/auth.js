const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Sign in
router.post('/signin', authController.signin);

// Sign in with google
router.post('/signin-with-google', authController.signinWithGoogle);

// Sign out
router.get('/signout', authController.signout);

// Change password
router.patch(
  '/change-password',
  authController.protect,
  authController.changePassword
);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Reset password
router.patch(
  '/reset-password/:resetPasswordToken',
  authController.resetPassword
);

module.exports = router;
