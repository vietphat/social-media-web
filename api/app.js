const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const router = require('./routes/index');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

router(app);

app.all('*', (req, res, next) => {
  next(new AppError(`Không tìm thấy đường dẫn ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
});

module.exports = app;
