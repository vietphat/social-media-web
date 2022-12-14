import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';

import { useForm } from '~/hooks/useForm';
import { VALIDATOR_EMAIL } from '~/utils/validators';
import routes from '~/config/routes';
import { Button, Input } from '~/components/AuthForm';
import images from '~/assets/images';
import styles from './ForgotPassword.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const ForgotPassword = () => {
    const [formState, handleInputChange] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
        },
        false,
    );
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8800/api/auth/forgot-password', {
                email: formState.inputs.email.value,
            });

            if (res.status === 200) {
                toast.success('Chúng tôi đã gửi yêu cầu lấy lại mật khẩu đến email của bạn!', {
                    position: 'bottom-right',
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(`Có lỗi xảy ra. ${error.response.data.message}`, {
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
                                onInput={handleInputChange}
                                validators={[VALIDATOR_EMAIL]}
                                placeholder="Email"
                                name="email"
                                id="email"
                            />
                        </div>

                        {!loading ? (
                            <Button
                                onClick={handleForgotPassword}
                                disabled={!formState.isValid}
                                className={cx('login-btn')}
                            >
                                Gửi yêu cầu lấy lại mật khẩu
                            </Button>
                        ) : (
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        )}

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

export default ForgotPassword;
