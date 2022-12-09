const express = require('express');

const authController = require('./../controllers/authController');
const conversationController = require('./../controllers/conversationController');

const router = express.Router();

router.use(authController.protect);

// Tạo một cuộc hội thoại
router.post('/create', conversationController.createConversation);

// Lấy các cuộc hội thoại theo user id
router.get('/get', conversationController.getConversations);

module.exports = router;
