import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
  return (
    <div className={cx('login')}>
      <div className={cx('card')}>
        <div className={cx('left')}>
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            sed earum dignissimos modi? Corporis provident illo, autem,
            voluptates, est rerum a vero ducimus quibusdam quidem vitae
            necessitatibus beatae rem temporibus.
          </p>
          <span>Chưa có tài khoản?</span>
          <Link to='/register'>
            <button>Đăng ký ngay</button>
          </Link>
        </div>
        <div className={cx('right')}>
          <h1>Đăng nhập</h1>
          <form>
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
            <button>Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
