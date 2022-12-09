const catchAsync = require('./../utils/catchAsync');
const Message = require('../models/Message');

// Tạo một tin nhắn
exports.createMessage = catchAsync(async (req, res, next) => {
  const { conversationId, receiver, text } = req.body;

  const message = await Message.create({
    conversationId,
    createdBy: req.user._id,
    receiver,
    text,
  });

  const data = await Message.populate(message, [
    {
      path: 'receiver',
      select: 'username avatarUrl',
    },
    { path: 'createdBy', select: 'username avatarUrl' },
  ]);

  res.status(201).json({
    status: 'Tạo tin nhắn thành công',
    data,
  });
});

// Lấy tin nhắn trong 1 cuộc hội thoại
exports.getMessages = catchAsync(async (req, res, next) => {
  const { conversationId } = req.params;

  const data = await Message.find({ conversationId }).populate({
    path: 'createdBy',
    select: 'username avatarUrl',
  });

  res.status(200).json({
    message: 'Thành công',
    data,
  });
});
