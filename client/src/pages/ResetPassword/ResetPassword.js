import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import routes from '~/config/routes';
import { Button, Input } from '~/components/AuthForm';
import images from '~/assets/images';
import styles from './ResetPassword.module.scss';

const cx = classNames.bind(styles);

const ResetPassword = () => {
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
                        <Input placeholder="Mật khẩu mới" name="password" id="password" type="password" />
                        <Input
                            placeholder="Xác nhận mật khẩu"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                        />
                    </div>

                    <Button disabled className={cx('login-btn')}>
                        Đổi mật khẩu
                    </Button>
                </form>

                <div className={cx('alternative-action-container')}>
                    Quay về trang <Link to={routes.login}>Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
