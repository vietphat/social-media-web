import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import httpRequest from '~/utils/httpRequest';
import { loginStart, loginSuccess, loginFailed } from '~/store';
import { useForm } from '~/hooks/useForm';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '~/utils/validators';
import routes from '~/config/routes';
import { Button, Input } from '~/components/AuthForm';
import images from '~/assets/images';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

const Register = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [formState, handleInputChange] = useForm(
        {
            username: {
                value: '',
                isValid: false,
            },
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
            confirmPassword: {
                value: '',
                isValid: false,
            },
        },
        false,
    );

    const handleRegister = async (e) => {
        e.preventDefault();

        dispatch(loginStart());
        try {
            const res = await httpRequest.post('/auth/register', {
                email: formState.inputs.email.value,
                username: formState.inputs.username.value,
                password: formState.inputs.password.value,
                confirmPassword: formState.inputs.confirmPassword.value,
            });
            if (res.status === 201) {
                dispatch(loginSuccess({ currentUser: res.data.data, jwt: res.data.token }));
                navigate('/');
            }
        } catch (error) {
            dispatch(loginFailed());
        }
    };

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
                        <Input
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={handleInputChange}
                            placeholder="Tên người dùng"
                            name="username"
                            id="username"
                        />
                        <Input
                            validators={[VALIDATOR_EMAIL()]}
                            onInput={handleInputChange}
                            placeholder="Email"
                            name="email"
                            id="email"
                        />
                        <Input
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={handleInputChange}
                            placeholder="Mật khẩu"
                            name="password"
                            id="password"
                            type="password"
                        />
                        <Input
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={handleInputChange}
                            placeholder="Xác nhận mật khẩu"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                        />
                    </div>

                    <p className={cx('description')}>
                        Bằng cách nhấn đăng ký, bạn đồng ý với điều khoản, chính sách riêng tư và chấp nhận cookies.
                    </p>

                    <Button onClick={handleRegister} disabled={!formState.isValid} className={cx('register-btn')}>
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
