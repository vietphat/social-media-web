const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Get a user
router.get('/:userId', userController.getUser);

router.use(authController.protect);

// Update user informations
router.patch(
  '/update-informations',
  userController.uploadImages,
  userController.processImages,
  userController.updateInformations
);

// Follow

// Unfollow

// Add friend

// Unfriend

// Get friends list

module.exports = router;
