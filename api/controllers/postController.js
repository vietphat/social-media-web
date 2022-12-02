const AppError = require('../utils/AppError');
const Post = require('./../models/Post');
const catchAsync = require('./../utils/catchAsync');

// create a post
exports.createPost = catchAsync(async (req, res, next) => {});

// update post
exports.updatePost = catchAsync(async (req, res, next) => {});

// delete post
exports.deletePost = catchAsync(async (req, res, next) => {});

// like a post
exports.likePost = catchAsync(async (req, res, next) => {});

// dislike a post
exports.dislikePost = catchAsync(async (req, res, next) => {});

// get a post
exports.getPost = catchAsync(async (req, res, next) => {});

// get timeline posts
exports.getTimelinePosts = catchAsync(async (req, res, next) => {});
