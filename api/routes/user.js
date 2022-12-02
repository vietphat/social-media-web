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

// Get friends list
router.get('/friends-list', userController.unfollow);

module.exports = router;
