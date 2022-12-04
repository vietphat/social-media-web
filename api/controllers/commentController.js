const mongoose = require('mongoose');
const Post = require('../models/Post');

const Comment = require('./../models/Comment');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

// create a comment
exports.createComment = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const { description } = req.body;

  if (description === '' || !description) {
    return next(new AppError('Bình luận không hợp lệ. Thử lại sau.', 400));
  }

  const createCommentSession = await mongoose.startSession();
  createCommentSession.startTransaction();

  const data = await Comment.create(
    [
      {
        createdBy: req.user._id,
        postId,
        description,
      },
    ],
    { session: createCommentSession }
  );

  await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: data[0]._id },
    },
    { session: createCommentSession }
  );

  createCommentSession.commitTransaction();

  return res.status(201).json({
    status: 'Bình luận thành công',
    data: data[0],
  });
});

// update a comment
exports.updateComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const { description } = req.body;
  if (description === '' || !description) {
    return next(new AppError('Bình luận không hợp lệ. Thử lại sau.', 400));
  }

  const data = await Comment.findByIdAndUpdate(
    commentId,
    {
      description,
    },
    { new: true }
  );

  return res.status(201).json({
    status: 'Cập nhật bình luận thành công',
    data,
  });
});

// delete a comment
exports.deleteComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new AppError('Không tìm thấy bình luận', 400));
  }

  const data = await comment.delete();

  res.status(200).json({
    status: 'Xóa bình luận thành công',
    data,
  });
});

// like a comment
exports.likeComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const { id: userId } = req.user;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new AppError('Không tìm thấy bình luận đang thích', 400));
  }

  if (!comment.likes.includes(userId)) {
    await comment.update({
      $push: { likes: userId },
    });

    res.status(200).json({
      status: 'Thích bình luận thành công',
    });
  } else {
    return next(new AppError('Bạn đã thich bình luận này rồi', 400));
  }
});

// unlike a comment
exports.unlikeComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const { id: userId } = req.user;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new AppError('Không tìm thấy bình luận đang thích', 400));
  }

  if (comment.likes.includes(userId)) {
    await comment.update({
      $pull: { likes: userId },
    });

    res.status(200).json({
      status: 'Bỏ bình luận thành công',
    });
  } else {
    return next(new AppError('Bạn chưa thich bình luận này', 400));
  }
});
