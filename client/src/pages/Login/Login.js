import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import httpRequest from '~/utils/httpRequest';
import { loginStart, loginSuccess, loginFailed } from '~/store';
import { useForm } from '~/hooks/useForm';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '~/utils/validators';
import routes from '~/config/routes';
import { Button, Input } from '~/components/AuthForm';
import images from '~/assets/images';
import styles from './Login.module.scss';
import React from 'react';

const cx = classNames.bind(styles);

const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [formState, handleInputChange] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
        },
        false,
    );

    const handleLogin = async (e) => {
        e.preventDefault();

        dispatch(loginStart());
        try {
            const res = await httpRequest.post('/auth/signin', {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
            });

            if (res.status === 200) {
                dispatch(loginSuccess({ currentUser: res.data.data, jwt: res.data.token }));
                navigate('/');
            } else {
                toast.error('Đăng nhập thất bại', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(`${error.response.data.message}. Vui lòng thử lại sau.`, {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            dispatch(loginFailed());
        }
    };

    return (
        <React.Fragment>
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
                                placeholder="Email"
                                name="email"
                                id="email"
                                validators={[VALIDATOR_EMAIL()]}
                                onInput={handleInputChange}
                            />
                            <Input
                                placeholder="Mật khẩu"
                                name="password"
                                id="password"
                                type="password"
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={handleInputChange}
                            />
                        </div>

                        <Button onClick={handleLogin} disabled={!formState.isValid} className={cx('login-btn')}>
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
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </React.Fragment>
    );
};

export default Login;
