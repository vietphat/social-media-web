import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import routes from '~/config/routes';
import { Button, Input } from '~/components/AuthForm';
import images from '~/assets/images';
import styles from './ResetPassword.module.scss';
import { useForm } from '~/hooks/useForm';
import { VALIDATOR_REQUIRE } from '~/utils/validators';

const cx = classNames.bind(styles);

const ResetPassword = () => {
    const [formState, handleInputChange] = useForm(
        {
            password: '',
            confirmPassword: '',
        },
        false,
    );

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
                        <Input
                            onInput={handleInputChange}
                            placeholder="Mật khẩu mới"
                            name="password"
                            id="password"
                            type="password"
                            validators={[VALIDATOR_REQUIRE()]}
                        />
                        <Input
                            onInput={handleInputChange}
                            placeholder="Xác nhận mật khẩu"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            validators={[VALIDATOR_REQUIRE()]}
                        />
                    </div>

                    <Button disabled className={cx('login-btn')}>
                        Gửi
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
