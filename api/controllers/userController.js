const mongoose = require('mongoose');

const AppError = require('../utils/AppError');
const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');

// Get a user
exports.getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate([
    { path: 'followers', select: 'username avatarUrl' },
    { path: 'following', select: 'username avatarUrl' },
    { path: 'friendsList', select: 'username avatarUrl' },
    {
      path: 'posts',
      populate: [
        {
          path: 'createdBy',
          select: 'username avatar',
        },
        {
          path: 'likes',
          select: 'username avatar',
        },
        {
          path: 'comments',
          select: 'createdBy description createdAt likes',
          populate: [
            { path: 'createdBy', select: 'username avatar' },
            { path: 'likes', select: 'username avatar' },
          ],
        },
      ],
    },
  ]);

  if (!user) {
    return next(
      new AppError(`Không tìm thấy người dùng nào có id là ${userId}`),
      400
    );
  }

  res.status(200).json({
    status: 'Thành công',
    data: {
      user,
    },
  });
});

// Get users by name or email
exports.searchUsersByNameOrEmail = catchAsync(async (req, res, next) => {
  const { searchInput: search } = req.params;

  const users = await User.find({
    $or: [
      {
        username: { $regex: search, $options: 'i' },
      },
      {
        email: { $regex: search, $options: 'i' },
      },
    ],
  });

  res.status(200).json({
    status: 'Thành công',
    length: users.length,
    data: users,
  });
});

// Get random users
exports.getRandomUsers = catchAsync(async (req, res, next) => {
  const data = await User.aggregate([
    { $sample: { size: 5 } },
    {
      $match: {
        _id: {
          $ne: req.user._id,
          $nin: [...req.user.following, ...req.user?.friendsList],
        },
      },
    },
  ]);

  res.status(200).json({
    status: 'Thành công',
    length: data.length,
    data,
  });
});

// Update user informations
exports.updateInformations = catchAsync(async (req, res, next) => {
  // Ngăn cập nhật mật khẩu bằng route này
  if (req.body.password) {
    return next(
      new AppError(
        'Không thể thay đổi mật khẩu bằng route này. Thử /change-password.',
        400
      )
    );
  }

  const { username, phoneNumber, address, avatarUrl } = req.body;

  // Cập nhật và lưu vào db
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      username,
      phoneNumber,
      address,
      avatarUrl:
        avatarUrl === ''
          ? 'https://firebasestorage.googleapis.com/v0/b/social-media-web-1648d.appspot.com/o/users%2Favatars%2Fdefault-avatar.jpg?alt=media&token=fe149b52-bf43-4711-ad59-5b1745d6f0ef'
          : avatarUrl,
    },
    {
      runValidators: true,
      new: true, // tránh thay đổi trường passwordChangedAt
    }
  ).populate([
    { path: 'followers', select: 'username avatarUrl' },
    { path: 'following', select: 'username avatarUrl' },
    { path: 'friendsList', select: 'username avatarUrl' },
    {
      path: 'posts',
      populate: [
        {
          path: 'createdBy',
          select: 'username avatar',
        },
        {
          path: 'likes',
          select: 'username avatar',
        },
        {
          path: 'comments',
          select: 'createdBy description createdAt likes',
          populate: [
            { path: 'createdBy', select: 'username avatar' },
            { path: 'likes', select: 'username avatar' },
          ],
        },
      ],
    },
  ]);

  res.status(200).json({
    status: 'Cập nhật thành công',
    data: user,
  });
});

// Follow
exports.follow = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const followedUserId = req.params.followedUserId;
  if (!(userId === followedUserId)) {
    if (!req.user.following.includes(followedUserId)) {
      const followingSession = await mongoose.startSession();
      followingSession.startTransaction();

      const data = await User.findByIdAndUpdate(
        userId,
        {
          $push: { following: followedUserId },
        },
        { session: followingSession, new: true }
      ).populate({
        path: 'following',
        select: 'username avatarUrl',
      });

      await User.findByIdAndUpdate(
        followedUserId,
        {
          $push: { followers: userId },
        },
        { session: followingSession }
      );

      followingSession.commitTransaction();

      res.status(200).json({
        status: 'Thành công',
        message: 'Theo dõi người dùng thành công',
        data,
      });
    } else {
      return next(new AppError('Bạn đã theo dõi tài khoản này rồi', 400));
    }
  } else {
    return next(new AppError('Bạn không thể tự theo dõi bản thân.', 400));
  }
});

// Unfollow
exports.unfollow = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const unfollowedUserId = req.params.unfollowedUserId;
  if (!(userId === unfollowedUserId)) {
    if (req.user.following.includes(unfollowedUserId)) {
      const unfollowingSession = await mongoose.startSession();
      unfollowingSession.startTransaction();

      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { following: unfollowedUserId },
        },
        { session: unfollowingSession }
      );

      await User.findByIdAndUpdate(
        unfollowedUserId,
        {
          $pull: { followers: userId },
        },
        { session: unfollowingSession }
      );

      unfollowingSession.commitTransaction();

      res.status(200).json({
        status: 'Thành công',
        message: 'Bỏ theo dõi người dùng thành công',
      });
    } else {
      return next(
        new AppError('Bạn hiện tại không có theo dõi người dùng này', 400)
      );
    }
  } else {
    return next(new AppError('Bạn không thể bỏ theo dõi bản thân.', 400));
  }
});

// Send friend request
exports.sendFriendRequest = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { receivedUserId } = req.params;

  if (userId === receivedUserId) {
    return next(new AppError('Bạn không thể kết bạn với chính bạn.', 400));
  }

  if (req.user.friendsList.includes(receivedUserId)) {
    return next(new AppError('Bạn đã kết bạn với người này rồi.', 400));
  }

  if (req.user.friendRequestsSent.includes(receivedUserId)) {
    return next(
      new AppError('Bạn đã gửi lời mời kết bạn với người này rồi.', 400)
    );
  }

  const sendFriendRequestSession = await mongoose.startSession();
  sendFriendRequestSession.startTransaction();

  await User.findByIdAndUpdate(
    userId,
    {
      $push: { friendRequestsSent: receivedUserId, following: receivedUserId },
    },
    { session: sendFriendRequestSession }
  );

  await User.findByIdAndUpdate(
    receivedUserId,
    {
      $push: { friendRequestsReceived: userId, followers: userId },
    },
    { session: sendFriendRequestSession }
  );

  sendFriendRequestSession.commitTransaction();

  res.status(200).json({
    status: 'Thành công',
    message: 'Gửi lời mời kết bạn thành công',
  });
});

// Cancel friend request
exports.cancelFriendRequest = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { receivedUserId } = req.params;

  if (userId === receivedUserId) {
    return next(
      new AppError('Bạn không thể hủy lời mời kết bạn với chính bạn.', 400)
    );
  }

  if (req.user.friendsList.includes(receivedUserId)) {
    return next(new AppError('Bạn đã kết bạn với người này rồi.', 400));
  }

  if (!req.user.friendRequestsSent.includes(receivedUserId)) {
    return next(
      new AppError('Bạn chưa gửi lời mời kết bạn với người này.', 400)
    );
  }

  const cancelFriendRequestSession = await mongoose.startSession();
  cancelFriendRequestSession.startTransaction();

  await User.findByIdAndUpdate(
    userId,
    {
      $pull: { friendRequestsSent: receivedUserId, following: receivedUserId },
    },
    { session: cancelFriendRequestSession }
  );

  await User.findByIdAndUpdate(
    receivedUserId,
    {
      $pull: { friendRequestsReceived: userId, followers: userId },
    },
    { session: cancelFriendRequestSession }
  );

  cancelFriendRequestSession.commitTransaction();

  res.status(200).json({
    status: 'Thành công',
    message: 'Hủy lời mời kết bạn thành công',
  });
});

// Accept friend request
exports.acceptFriendRequest = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { acceptedUserId } = req.params;

  if (!req.user.friendRequestsReceived.includes(acceptedUserId)) {
    return next(new AppError('Lời mời kết bạn không tồn tại', 400));
  }

  const acceptingSession = await mongoose.startSession();
  acceptingSession.startTransaction();

  await User.findByIdAndUpdate(
    userId,
    {
      $push: { friendsList: acceptedUserId, following: acceptedUserId },
      $pull: { friendRequestsReceived: acceptedUserId },
    },
    { session: acceptingSession }
  );

  await User.findByIdAndUpdate(
    acceptedUserId,
    {
      $push: { friendsList: userId, followers: userId },
      $pull: { friendRequestsSent: userId },
    },
    { session: acceptingSession }
  );

  acceptingSession.commitTransaction();

  res.status(200).json({
    status: 'Thành công',
    message: 'Kết bạn thành công',
  });
});

// Decline friend request
exports.declineFriendRequest = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { declinedUserId } = req.params;

  if (!req.user.friendRequestsReceived.includes(declinedUserId)) {
    return next(new AppError('Lời mời kết bạn không tồn tại', 400));
  }

  const decliningSession = await mongoose.startSession();
  decliningSession.startTransaction();

  await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        friendRequestsReceived: declinedUserId,
        followers: declinedUserId,
      },
    },
    { session: decliningSession }
  );

  await User.findByIdAndUpdate(
    declinedUserId,
    {
      $pull: { friendRequestsSent: userId, following: userId },
    },
    { session: decliningSession }
  );

  decliningSession.commitTransaction();

  res.status(200).json({
    status: 'Thành công',
    message: 'Từ chối lời mời kết bạn thành công',
  });
});

// Unfriend
exports.unfriend = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { unfriendedUserId } = req.params;

  if (!req.user.friendsList.includes(unfriendedUserId)) {
    return next(new AppError('Bạn không thể hủy kết bạn với người lạ', 400));
  }

  const unfriendingSession = await mongoose.startSession();
  unfriendingSession.startTransaction();

  await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        friendsList: unfriendedUserId,
        following: unfriendedUserId,
        followers: unfriendedUserId,
      },
    },
    { session: unfriendingSession }
  );

  await User.findByIdAndUpdate(
    unfriendedUserId,
    {
      $pull: {
        friendsList: userId,
        following: userId,
        followers: userId,
      },
    },
    { session: unfriendingSession }
  );

  unfriendingSession.commitTransaction();

  res.status(200).json({
    status: 'Thành công',
    message: 'Hủy kết bạn thành công',
  });
});
