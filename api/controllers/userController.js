const multer = require('multer');
const sharp = require('sharp');

const AppError = require('../utils/AppError');
const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');

// Tạo middleware upload hình
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) return cb(null, true);
  cb(new AppError('File không phải định dạng hình. Thử lại sau.', 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImages = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
]);

exports.processImages = async (req, res, next) => {
  if (req.files.avatar?.length === 0 && req.files.coverImage?.length === 0)
    return next();

  // nếu email để đặt tên file
  const email = req.body.email || (await User.findById(req.user._id)).email;

  // tên file dùng để lưu trong db và trên server
  req.files?.avatar &&
    (req.files.avatar[0].filename = `avatar-${email}-${Date.now()}.jpeg`);

  req.files?.coverImage &&
    (req.files.coverImage[0].filename = `cover-image-${email}-${Date.now()}.jpeg`);

  // xử lý và lưu ảnh đại diện trên server
  req.files?.avatar &&
    (await sharp(req.files.avatar[0].buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .toFile(`public/images/users/avatar/${req.files.avatar[0].filename}`));

  // xử lý và lưu ảnh bìa trên server
  req.files?.coverImage &&
    (await sharp(req.files.coverImage[0].buffer)
      // .resize(500, 500)
      .toFormat('jpeg')
      .toFile(
        `public/images/users/cover-image/${req.files.coverImage[0].filename}`
      ));

  next();
};

// Lọc bỏ các cột người dùng không được phép thay đổi
const filterUpdateFields = (filterObject, ...allowedFields) => {
  const filteredObject = {};
  allowedFields.forEach((el) => (filteredObject[el] = filterObject[el]));
  return filteredObject;
};

// Get a user
exports.getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

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

// Update user informations
exports.updateInformations = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // Ngăn cập nhật mật khẩu bằng route này
  if (req.body.password) {
    return next(
      new AppError(
        'Không thể thay đổi mật khẩu bằng route này. Thử /change-password.',
        400
      )
    );
  }

  // Filter update fields
  const filteredObject = filterUpdateFields(
    req.body,
    // 'avatar',
    // 'coverImage',
    'username',
    'phoneNumber',
    'address'
  );

  // Cập nhật ảnh đại diện + ảnh bìa
  if (req.files?.avatar) {
    filteredObject.avatar = req.files.avatar[0].filename;
  }

  if (req.files?.coverImage) {
    filteredObject.coverImage = req.files.coverImage[0].filename;
  }

  // Cập nhật và lưu vào db
  const user = await User.findByIdAndUpdate(req.user._id, filteredObject, {
    runValidators: true,
    new: true, // tránh thay đổi trường passwordChangedAt
  });

  res.status(200).json({
    status: 'success',
    user,
  });
});

// Follow

// Unfollow

// Add friend

// Unfriend

// Get friends list
