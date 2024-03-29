const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Search users by name or email
router.get('/search/:searchInput', userController.searchUsersByNameOrEmail);

// Get a user
router.get('/:userId', userController.getUser);

router.use(authController.protect);

// Get random users
router.get('/get/random-users', userController.getRandomUsers);

// Update user informations
router.patch('/update-informations', userController.updateInformations);

// Follow
router.patch('/follow/:followedUserId', userController.follow);

// Unfollow
router.patch('/unfollow/:unfollowedUserId', userController.unfollow);

// Send friend request
router.patch(
  '/send-friend-request/:receivedUserId',
  userController.sendFriendRequest
);

// Cancel friend request
router.patch(
  '/cancel-friend-request/:receivedUserId',
  userController.cancelFriendRequest
);

// Accept friend request
router.patch(
  '/accept-friend-request/:acceptedUserId',
  userController.acceptFriendRequest
);

// Decline friend request
router.patch(
  '/decline-friend-request/:declinedUserId',
  userController.declineFriendRequest
);

// Unfriend
router.patch('/unfriend/:unfriendedUserId', userController.unfriend);

module.exports = router;
