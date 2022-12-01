const crypto = require('crypto');
const { promisify } = require('util');

const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Hàm tạo jsonwebtoken
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Hàm tạo và gửi jsonwebtoken qua json
const createAndSendToken = (user, res, req, statusCode) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'Thành công',
    token,
    data: user,
  });
};

// Register
exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  const user = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });

  user.password = undefined;

  // await new Email(
  //   user,
  //   `${req.protocol}://${req.get('host')}/me`
  // ).sendWelcome();

  createAndSendToken(user, res, req, 201);
});

// Sign in
exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Kiểm tra nếu người dùng chưa nhập tài khoản hoặc mật khẩu
  if (!email || !password) {
    return next(
      new AppError('Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu', 400)
    );
  }

  // 2. Lấy user trong db qua email
  const user = await User.findOne({ email }).select('+password');

  // 3. Kiểm tra mật khẩu có chính xác hay không
  if (!(await user.enteredPasswordIsCorrect(password, user.password))) {
    return next(new AppError('Tài khoản hoặc mật khẩu chưa chính xác', 401));
  }

  // 4. Tạo và gửi token
  createAndSendToken(user, res, req, 200);
});

// Sign out
exports.signout = catchAsync(async (req, res, next) => {
  // xóa cookie jwt và cho nó hết hạn ngay lập tức
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() - 3 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'Đăng xuất thành công',
  });
});

// middleware dùng để ngăn người dùng truy cập khi chưa được xác thực
exports.protect = catchAsync(async (req, res, next) => {
  // 1. Kiểm tra người dùng đã đăng nhập chưa
  let token = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt && req.cookies?.jwt !== '') {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('Vui lòng đăng nhập để có quyền truy cập vào route này', 401)
    );
  }

  // 2. Verify jwt
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Kiểm tra user có tồn tại hay không
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('Tài khoản không tồn tại', 401));
  }

  // 4. Kiểm tra nếu người dùng đã thay đổi mật khẩu sau khi token được tạo
  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError('Jsonwebtoken đã hết hạn. Vui lòng đăng nhập lại', 401)
    );
  }

  req.user = currentUser;
  next();
});

// Change password
exports.changePassword = async (req, res, next) => {
  res.status(200).json({
    message: 'hello from register controller',
  });
};

// Forgot password
exports.forgotPassword = async (req, res, next) => {
  res.status(200).json({
    message: 'hello from register controller',
  });
};

// Reset password
exports.resetPassword = async (req, res, next) => {
  res.status(200).json({
    message: 'hello from register controller',
  });
};
