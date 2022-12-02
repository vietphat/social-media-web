const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    description: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default: [],
    },
    video: {
      type: String,
      default: '',
    },
    postType: {
      type: String,
      enum: {
        values: ['d', 'i', 'v', 'di', 'dv'],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
