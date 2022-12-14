const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const Post = require('./../models/Post');
const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');
const shuffle = require('./../utils/shuffle');

// get a post
exports.getPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const data = await Post.findById(postId);

  if (!data) {
    return next(new AppError('Không tìm thấy bài đăng', 400));
  }

  res.status(200).json({
    status: 'Thành công',
    data,
  });
});

// get timeline posts
exports.getTimelinePosts = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;

  const currentUserPosts = await Post.find({ createdBy: userId });

  let followingPosts = [];
  const followingUserIds = req.user.following.map((followingUserId) =>
    followingUserId.toString()
  );
  if (followingUserIds.length > 0) {
    followingPosts = (
      await Promise.all(
        followingUserIds.map(async (followingUserId) => {
          return Post.find({ createdBy: followingUserId });
        })
      )
    ).flat();
  }

  const data = [...currentUserPosts, ...followingPosts].sort((postA, postB) => {
    return new Date(postB.createdAt) - new Date(postA.createdAt);
  });

  res.status(200).json({
    status: 'Thành công',
    data,
  });
});

// get liked posts
exports.getLikedPosts = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;

  const data = await Post.find({ likes: { $in: userId } });

  res.status(200).json({
    status: 'Thành công',
    length: data.length,
    data,
  });
});

// get all posts
exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  const data = shuffle(posts);

  res.status(200).json({
    status: 'Thành công',
    length: data.length,
    data,
  });
});

// create a post
exports.createPost = catchAsync(async (req, res, next) => {
  const { description, mediaUrls } = req.body;

  if (
    description === '' ||
    !description ||
    mediaUrls?.length === 0 ||
    !mediaUrls
  ) {
    return next(new AppError('Bài đăng không hợp lệ. Thử lại sau.', 400));
  }

  const createPostSession = await mongoose.startSession();
  createPostSession.startTransaction();

  const data = await Post.create(
    [
      {
        createdBy: req.user._id,
        description,
        mediaUrls,
      },
    ],
    { session: createPostSession }
  );

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { posts: data[0]._id },
    },
    { session: createPostSession }
  );

  createPostSession.commitTransaction();

  const post = await Post.populate(data[0], [
    { path: 'createdBy', select: 'username avatarUrl' },
  ]);

  return res.status(201).json({
    status: 'Đăng bài thành công',
    data: post,
  });
});

// update post
exports.updatePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const { description, mediaUrls } = req.body;

  if (description === '' && mediaUrls?.length === 0) {
    return next(
      new AppError(
        'Bài đăng không thể thiếu cả trạng thái và file phương tiện',
        400
      )
    );
  }

  const post = await Post.findByIdAndUpdate(postId);

  if (description === '') {
    post.description = undefined;
  } else if (description) {
    post.description = description;
  }

  if (mediaUrls?.length > 0) {
    post.mediaUrls = [...post.mediaUrls, ...mediaUrls];
  } else if (mediaUrls?.length === 0) {
    post.mediaUrls = undefined;
  }

  data = await post.save();

  const updatedPost = await Post.populate(data, [
    { path: 'createdBy', select: 'username avatar' },
  ]);

  res.status(200).json({
    status: 'Sửa bài đăng thành công',
    data: updatedPost,
  });
});

// delete post
exports.deletePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const data = await Post.findById(postId);

  if (!data) {
    return next(new AppError('Không tìm thấy bài đăng', 400));
  }

  const deletePostSession = await mongoose.startSession();
  deletePostSession.startTransaction();

  await data.delete({ session: deletePostSession });

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { posts: data._id },
    },
    { session: deletePostSession }
  );

  deletePostSession.commitTransaction();

  res.status(200).json({
    status: 'Xóa bài đăng thành công',
    data,
  });
});

// like a post
exports.likePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (
    post.likes.findIndex(
      (like) => like._id.toString() === req.user._id.toString()
    ) === -1
  ) {
    post.likes.push(req.user.id);

    const data = await (
      await post.save()
    ).populate([
      {
        path: 'createdBy',
        select: 'username avatarUrl',
      },
      {
        path: 'likes',
        select: 'username avatarUrl',
      },
      {
        path: 'comments',
        select: 'createdBy description createdAt likes',
        populate: [
          {
            path: 'createdBy',
            select: 'username avatarUrl',
          },
          { path: 'likes', select: 'username avatarUrl' },
        ],
      },
    ]);

    res.status(200).json({
      status: 'Thích bài đăng thành công',
      data,
    });
  } else {
    return next(new AppError('Bạn đã thích bài đăng này rồi', 400));
  }
});

// unlike a post
exports.unlikePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  const likedUserIdIndex = post.likes.findIndex(
    (like) => like._id.toString() === req.user._id.toString()
  );

  if (likedUserIdIndex !== -1) {
    console.log(likedUserIdIndex);
    post.likes.splice(likedUserIdIndex, 1);

    const data = await post.save();

    res.status(200).json({
      status: 'Bỏ thích bài đăng thành công',
      data,
    });
  } else {
    return next(new AppError('Bạn chưa thích bài đăng này', 400));
  }
});
