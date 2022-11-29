const AppError = require('../utils/AppError');

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(
      new AppError(
        'Vui lòng cung cấp đầy đủ thông tin (tên người dùng, email, mật khẩu)',
        400
      )
    );
  }
};

exports.login = async (req, res, next) => {};
