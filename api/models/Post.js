const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
    },
    mediaUrls: {
      type: Array,
      default: [],
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Comment',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate([
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
      select: 'createdBy description createdAt likes postId',
      populate: [
        {
          path: 'createdBy',
          select: 'username avatarUrl',
        },
        { path: 'likes', select: 'username avatarUrl' },
      ],
    },
  ]);

  next();
});

module.exports = mongoose.model('Post', postSchema);
