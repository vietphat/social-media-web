const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.from = `Instagram Clone <${process.env.EMAIL_FROM}>`;
    this.to = user.email;
    this.firstName = user.username.split(' ')[0];
    this.url = url;
  }

  // 1. Create a new transport
  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // 2. Send
  async send(subject, text) {
    // const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    //   firstName: this.firstName,
    //   url: this.url,
    //   subject: subject,
    // });

    const message = {
      from: this.from,
      to: this.to,
      subject,
      html: text,
    };

    // 3. Send email
    await this.newTransport().sendMail(message);
  }

  async sendWelcome() {
    await this.send(
      'Xin chào',
      `<h1>Chào mừng đến với Instagram Clone!</h1><p>Bạn vừa tạo tải khoản thành công trên trang web của chúng tôi. <a href="${this.url}">Truy cập ngay</a> </p>`
    );
  }

  async sendResetPassword() {
    await this.send(
      'Tạo lại mật khẩu',
      `Có phải bạn vừa gửi yêu cầu lấy lại mật khẩu? Nếu đúng là vậy hãy nhấp vào <a href="${this.url}">đây</a> để tạo mật khẩu mới.`
    );
  }

  async sendChangePasswordSuccessfully() {
    await this.send(
      'Đổi mật khẩu thành công',
      `Bạn đã thay đổi mật khẩu thành công.`
    );
  }
};

// const sendEmail = async (user, subject, text) => {
//   // 1. Create transporter
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//       user: '933ba827ceb686',
//       pass: '4af2049beb2be3',
//     },
//   });

//   // 2. Options
//   const options = {
//     from: 'Phat Le <admin@example.com>',
//     to: user.email,
//     subject: subject,
//     text: text,
//   };

//   // 3. Send email
//   await transporter.sendMail(options);
// };
