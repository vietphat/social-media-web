const express = require('express');

const authController = require('./../controllers/authController');
const messageController = require('./../controllers/messageController');

const router = express.Router();

router.use(authController.protect);

// Tạo một tin nhắn
router.post('/create', messageController.createMessage);

// Lấy các tin nhắn theo hội thoại
router.get('/get/:conversationId', messageController.getMessages);

module.exports = router;
