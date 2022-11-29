import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Register.module.scss';

const cx = classNames.bind(styles);

const Register = () => {
  return (
    <div className={cx('register')}>
      <div className={cx('card')}>
        <div className={cx('left')}>
          <h1>Social Web.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            sed earum dignissimos modi? Corporis provident illo, autem,
            voluptates, est rerum a vero ducimus quibusdam quidem vitae
            necessitatibus beatae rem temporibus.
          </p>
          <span>Đã có tài khoản?</span>
          <Link to='/login'>
            <button>Đăng nhập ngay</button>
          </Link>
        </div>
        <div className={cx('right')}>
          <h1>Đăng ký</h1>
          <form>
            <input type='email' placeholder='Email' title='Điền email' />
            <input
              type='text'
              placeholder='Tên đăng nhập'
              title='Điền tên đăng nhập'
            />
            <input
              type='password'
              placeholder='Mật khẩu'
              title='Điền mật khẩu'
            />
            <input
              type='name'
              placeholder='Tên người dùng'
              title='Điền tên người dùng (tên hiển thị)'
            />

            <button>Đăng ký</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
