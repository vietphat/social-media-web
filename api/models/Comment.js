const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
