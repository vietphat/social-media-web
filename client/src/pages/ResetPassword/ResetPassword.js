import { Link, useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
    const [loading, setLoading] = useState(false);

    const { token } = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.patch(`http://localhost:8800/api/auth/reset-password/${token}`, {
                password: formState.inputs.password.value,
                confirmPassword: formState.inputs.confirmPassword.value,
            });

            if (res.status === 200) {
                navigate(routes.login);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(`${error.response.data.message}`, {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            console.log(error);
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

                        {!loading ? (
                            <Button
                                onClick={handleResetPassword}
                                disabled={!formState.isValid}
                                className={cx('login-btn')}
                            >
                                Gửi
                            </Button>
                        ) : (
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        )}
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

export default ResetPassword;
