const crypto = require('crypto');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    // Các thông tin xác thực
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      unique: [true, 'Email này đã được sử dụng'],
      validate: [validator.isEmail, 'Email không hợp lệ'],
    },
    password: {
      type: String,
      required: [true, 'Mật khẩu là bắt buộc'],
      min: 4,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Vui lòng xác nhận mật khẩu'],
      validate: {
        validator: function (confirmPassword) {
          return this.password === confirmPassword;
        },
        message: 'Mật khẩu xác nhận không chính xác',
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordTokenExpiresIn: {
      type: Date,
    },
    // Thông tin cá nhân
    username: {
      type: String,
      required: [true, 'Tên người dùng là bắt buộc'],
    },
    avatar: {
      type: String,
      default: 'default-avatar.jpg',
    },
    coverImage: {
      type: String,
      default: 'default-cover-image.jpg',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    friends: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    // likedPosts: {
    //   type: [
    //     {
    //       type: mongoose.Schema.ObjectId,
    //       ref: 'Post',
    //     },
    //   ],
    // },
  },
  {
    timestamps: true,
  }
);

// PRE HOOK: Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
  // Chỉ mã hóa mật khẩu khi cột password được thêm hoặc được thay đổi
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

// PRE HOOK: Cập nhật cột passwordChangedAt(thời gian thay đổi mật khẩu)
// khi mật khẩu được thay đổi (loại trừ trường hợp đây là document mới)
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// METHOD kiểm tra mật khẩu nhập vào có chính xác hay không
userSchema.methods.enteredPasswordIsCorrect = async (
  candicatePassword,
  userPassword
) => {
  return await bcrypt.compare(candicatePassword, userPassword);
};

// METHOD kiểm tra xem ngày thay đổi mật khẩu là trước hay sau ngày tạo jwt
// false: trước hoặc chưa đổi mật khẩu lần nào
// true: thay đổi mật khẩu sau khi token được tạo
userSchema.methods.passwordChangedAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const passwordChangedAt = new Date(this.passwordChangedAt).getTime() / 1000;
    return passwordChangedAt > tokenIssuedAt;
  }

  return false;
};

// METHOD dùng để tạo token cho phép người dùng sử dụng để thay đổi mật khẩu khi quên
userSchema.methods.createResetPasswordToken = function () {
  // Tạo reset password token bằng module crypto của nodejs
  const resetPasswordToken = crypto.randomBytes(32).toString('hex');

  // Hash và Lưu reset password token và thời hạn của token đó vào database
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetPasswordToken)
    .digest('hex');

  // token sẽ chỉ có hiệu lực trong 10 phút
  this.resetPasswordTokenExpiresIn = Date.now() + 10 * 60 * 1000;

  return resetPasswordToken;
};

module.exports = mongoose.model('User', userSchema);
