const express = require('express');

const authController = require('./../controllers/authController');
const commentController = require('./../controllers/commentController');

const router = express.Router();

router.use(authController.protect);

// create a comment
router.post('/create/:postId', commentController.createComment);

// update a comment
router.patch('/update/:commentId', commentController.updateComment);

// delete a comment
router.delete('/delete/:commentId', commentController.deleteComment);

// like a comment
router.patch('/like/:commentId', commentController.likeComment);

// unlike a comment
router.patch('/unlike/:commentId', commentController.unlikeComment);

module.exports = router;
