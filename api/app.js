// NodeJS api và các packages khác
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// File nội bộ
const router = require('./routes/index');
const AppError = require('./utils/AppError');
const errorController = require('./controllers/errorController');

const app = express();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

router(app);

app.all('*', (req, res, next) => {
  next(new AppError(`Không tìm thấy đường dẫn ${req.originalUrl}`, 404));
});

app.use(errorController.globalErrorHandler);

module.exports = app;
