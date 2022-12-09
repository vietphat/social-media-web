const catchAsync = require('./../utils/catchAsync');
const Conversation = require('./../models/Conversation');

// Tạo cuộc hội thoại
exports.createConversation = catchAsync(async (req, res, next) => {
  const { receiver } = req.body;

  const conversation = await Conversation.create({
    members: [req.user._id, receiver],
  });

  const data = await Conversation.populate(conversation, {
    path: 'members',
    select: 'username avatarUrl',
  });

  res.status(201).json({
    status: 'Tạo hội thoại thành công',
    data,
  });
});

// Lấy các cuộc hội thoại của người dùng
exports.getConversations = catchAsync(async (req, res, next) => {
  const data = await Conversation.find({
    members: { $in: [req.user._id] },
  });

  res.status(200).json({
    message: 'Thành công',
    data,
  });
});
