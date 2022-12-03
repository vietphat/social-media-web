const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    description: {
      type: String,
    },
    imageUrls: {
      type: Array,
    },
    videoUrls: {
      type: Array,
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
    postType: {
      type: String,
      enum: {
        values: [
          'desciption_only',
          'image_only',
          'video_only',
          'description_image',
          'description_video',
          'image_video',
          'all',
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
