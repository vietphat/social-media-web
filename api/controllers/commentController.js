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

  const comment = await Comment.create(
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
      $push: { comments: comment[0]._id },
    },
    { session: createCommentSession }
  );

  createCommentSession.commitTransaction();

  const data = await Comment.populate(comment[0], {
    path: 'createdBy',
    select: 'username avatarUrl',
  });

  return res.status(201).json({
    status: 'Bình luận thành công',
    data,
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
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: { likes: userId },
      },
      { new: true }
    );

    const data = await Comment.populate(updatedComment, [
      { path: 'createdBy', select: 'username avatarUrl' },
      { path: 'likes', select: 'username avatar' },
    ]);

    res.status(200).json({
      status: 'Thích bình luận thành công',
      data,
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
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $pull: { likes: userId },
      },
      { new: true }
    );

    const data = await Comment.populate(updatedComment, [
      { path: 'createdBy', select: 'username avatarUrl' },
      { path: 'likes', select: 'username avatar' },
    ]);

    res.status(200).json({
      status: 'Bỏ thích bình luận thành công',
      data,
    });
  } else {
    return next(new AppError('Bạn chưa thich bình luận này', 400));
  }
});
