import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import routes from '~/config/routes';
import { Button, Input } from '~/components/AuthForm';
import images from '~/assets/images';
import styles from './ForgotPassword.module.scss';

const cx = classNames.bind(styles);

const ForgotPassword = () => {
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
                    </div>

                    <Button disabled className={cx('login-btn')}>
                        Thay đổi mật khẩu qua email
                    </Button>

                    <div className={cx('separation-line')}>
                        <hr className={cx('left-line')} />
                        <span>HOẶC</span>
                        <hr className={cx('right-line')} />
                    </div>

                    <Link className={cx('register-btn')} to={routes.register}>
                        Tạo tài khoản mới?
                    </Link>
                </form>

                <div className={cx('alternative-action-container')}>
                    Quay về trang <Link to={routes.login}>Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;