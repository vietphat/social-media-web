const express = require('express');

const authController = require('./../controllers/authController');
const postController = require('./../controllers/postController');

const router = express.Router();

router.use(authController.protect);

// create a post
router.post('/create', postController.createPost);

// update a post
router.patch('/update/:postId', postController.updatePost);

// delete a post
router.delete('/delete/:postId', postController.deletePost);

// like a post
router.patch('/like/:postId', postController.likePost);

// unlike a post
router.patch('/unlike/:postId', postController.unlikePost);

// get a post
router.get('/get/:postId', postController.getPost);

// get timeline posts
router.get('/get-timeline-posts', postController.getTimelinePosts);

module.exports = router;
