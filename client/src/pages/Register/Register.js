import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import routes from '~/config/routes';
import { Button, Input } from '~/components/AuthForm';
import images from '~/assets/images';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

const Register = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form className={cx('form')}>
                    <div className={cx('logo-container')}>
                        <Link to={routes.home}>
                            <img src={images.logo} alt="Instagram Logo" />
                        </Link>
                    </div>
                    <p className={cx('title')}>Đăng nhập để xem hình ảnh và video của bạn bè.</p>

                    <Button rounded className={cx('gmail-login-button')}>
                        Đăng nhập bằng gmail
                    </Button>

                    <div className={cx('separation-line')}>
                        <hr className={cx('left-line')} />
                        <span>HOẶC</span>
                        <hr className={cx('right-line')} />
                    </div>

                    <div className={cx('form-controls')}>
                        <Input placeholder="Tên người dùng" name="username" id="username" />
                        <Input placeholder="Email" name="email" id="email" />
                        <Input placeholder="Mật khẩu" name="password" id="password" type="password" />
                        <Input
                            placeholder="Xác nhận mật khẩu"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                        />
                    </div>

                    <p className={cx('description')}>
                        Bằng cách nhấn đăng nhập, bạn đồng ý với điều khoản, chính sách riêng tư và chấp nhận cookies.
                    </p>

                    <Button disabled className={cx('register-btn')}>
                        Đăng ký
                    </Button>
                </form>

                <div className={cx('alternative-action-container')}>
                    Đã có tài khoản <Link to={routes.login}>Đăng nhập ngay</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
