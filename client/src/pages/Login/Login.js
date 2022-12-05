import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import routes from '~/config/routes';
import { Button, Input } from '~/components/AuthForm';
import images from '~/assets/images';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form className={cx('form')}>
                    <div className={cx('logo-container')}>
                        <Link to={routes.home}>
                            <img src={images.logo} alt="Instagram Logo" />
                        </Link>
                    </div>

                    <div className={cx('form-controls')}>
                        <Input placeholder="Email" name="email" id="email" />
                        <Input placeholder="Mật khẩu" name="password" id="password" type="password" />
                    </div>

                    <Button disabled className={cx('login-btn')}>
                        Đăng nhập
                    </Button>

                    <div className={cx('separation-line')}>
                        <hr className={cx('left-line')} />
                        <span>HOẶC</span>
                        <hr className={cx('right-line')} />
                    </div>

                    <Button rounded className={cx('gmail-login-button')}>
                        Đăng nhập bằng gmail
                    </Button>

                    <Link className={cx('forgot-password-btn')} to={routes.forgotPassword}>
                        Quên mật khẩu?
                    </Link>
                </form>

                <div className={cx('alternative-action-container')}>
                    Chưa có tài khoản <Link to={routes.register}>Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
