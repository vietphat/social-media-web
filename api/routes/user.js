const express = require('express');

const userController = require('./../controllers/userController');
const { protect } = require('./../controllers/authController');

const router = express.Router();

router.use(protect);

// Update user data
router.patch('/update-data', userController.updateData);

// Follow

// Unfollow

// Add friend

// Unfriend

// Get friends list

module.exports = router;
