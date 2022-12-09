const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Conversation',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'receiver',
    select: 'username avatarUrl',
  });

  next();
});

module.exports = mongoose.model('Message', messageSchema);
