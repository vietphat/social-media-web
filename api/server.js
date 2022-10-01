const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

// Load các biến trong file .env vào process.env
dotenv.config();

// Kết nối database
const db = process.env.DB_CONNECTION_STRING.replace(
  '<password>',
  process.env.DB_PASSWORD
);

mongoose
  .connect(db, {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Kết nối đến database thành công!'));

// Chạy server
app.listen(process.env.PORT || 3300, () => {
  console.log('Server đang chạy trên cổng 8800!');
});
