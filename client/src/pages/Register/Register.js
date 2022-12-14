import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';

import { auth, provider } from '~/utils/firebase';
import httpRequest from '~/utils/httpRequest';
import { loginStart, loginSuccess, loginFailed } from '~/store';
import { useForm } from '~/hooks/useForm';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '~/utils/validators';
import routes from '~/config/routes';
import { Button, Input } from '~/components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GoogleIcon } from '~/components/Icons';
import { signInWithPopup } from 'firebase/auth';
import images from '~/assets/images';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

const Register = () => {
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
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
            setLoading(false);
        } catch (error) {
            let errorMessage = error.response.data.message;
            if (errorMessage.startsWith('E11000')) {
                errorMessage = 'Email này đã được sử dụng';
            }
            setLoading(false);
            toast.error(`${errorMessage}`, {
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

    const handleSigninWithGoogle = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        signInWithPopup(auth, provider)
            .then((result) => {
                httpRequest
                    .post('/auth/signin-with-google', {
                        username: result.user.displayName,
                        email: result.user.email,
                    })
                    .then((res) => {
                        dispatch(loginSuccess({ currentUser: res.data.data, jwt: res.data.token }));
                        navigate('/');
                    });
            })
            .catch((error) => {
                dispatch(loginFailed());
            });
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
                        <p className={cx('title')}>Đăng nhập để xem hình ảnh và video của bạn bè.</p>

                        <Button onClick={handleSigninWithGoogle} rounded className={cx('gmail-login-button')}>
                            <GoogleIcon /> Đăng nhập bằng Google
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

                        {!loading ? (
                            <Button
                                onClick={handleRegister}
                                disabled={!formState.isValid}
                                className={cx('register-btn')}
                            >
                                Đăng ký
                            </Button>
                        ) : (
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        )}
                    </form>

                    {!loading && (
                        <div className={cx('alternative-action-container')}>
                            Đã có tài khoản <Link to={routes.login}>Đăng nhập ngay</Link>
                        </div>
                    )}
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

export default Register;
