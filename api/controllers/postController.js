const mongoose = require('mongoose');

const AppError = require('../utils/AppError');
const Post = require('./../models/Post');
const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');

// create a post
exports.createPost = catchAsync(async (req, res, next) => {
  const { description, imageUrls, videoUrls } = req.body;

  if (
    (description === '' || !description) &&
    (imageUrls?.length === 0 || !imageUrls) &&
    (videoUrls?.length === 0 || !videoUrls)
  ) {
    return next(new AppError('Bài đăng không hợp lệ. Thử lại sau.', 400));
  }

  let postType;
  if (
    description &&
    (imageUrls?.length === 0 || !imageUrls) &&
    (videoUrls?.length === 0 || !videoUrls)
  ) {
    postType = 'desciption_only';
  } else if (
    !description &&
    imageUrls?.length > 0 &&
    (videoUrls?.length === 0 || !videoUrls)
  ) {
    postType = 'image_only';
  } else if (
    !description &&
    (imageUrls?.length === 0 || !imageUrls) &&
    videoUrls?.length > 0
  ) {
    postType = 'video_only';
  } else if (
    description &&
    imageUrls?.length > 0 &&
    (videoUrls?.length === 0 || !videoUrls)
  ) {
    postType = 'desciption_image';
  } else if (
    description &&
    (imageUrls?.length === 0 || !imageUrls) &&
    videoUrls?.length > 0
  ) {
    postType = 'desciption_video';
  } else if (!description && imageUrls?.length > 0 && videoUrls?.length > 0) {
    postType = 'image_video';
  } else if (description && imageUrls?.length > 0 && videoUrls?.length > 0) {
    postType = 'all';
  } else {
    return next(new AppError('Có lỗi khi đăng post'));
  }

  const data = await Post.create({
    createdBy: req.user._id,
    description,
    imageUrls,
    videoUrls,
    postType,
  });

  return res.status(201).json({
    status: 'Đăng bài thành công',
    data,
  });
});

// update post
exports.updatePost = catchAsync(async (req, res, next) => {});

// delete post
exports.deletePost = catchAsync(async (req, res, next) => {});

// like a post
exports.likePost = catchAsync(async (req, res, next) => {});

// unlike a post
exports.unlikePost = catchAsync(async (req, res, next) => {});

// get a post
exports.getPost = catchAsync(async (req, res, next) => {});

// get timeline posts
exports.getTimelinePosts = catchAsync(async (req, res, next) => {});
