import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { logout, replaceUserData } from '~/store';
import styles from './ChangeInfo.module.scss';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from '~/utils/firebase';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const ChangeInfo = () => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [avatarFile, setAvatarFile] = useState();
    const [avatarUrl, setAvatarUrl] = useState();
    const [uploadAvatarSuccessfully, setUploadAvatarSuccessfully] = useState();
    const [infoInputs, setInfoInputs] = useState({
        inputs: {
            username: user.currentUser.username,
            address: user.currentUser.address,
            phoneNumber: user.currentUser.phoneNumber,
            avatarUrl: user.currentUser.avatarUrl,
        },
        infoInputsValid: false,
    });

    const [passwordInputs, setPasswordInputs] = useState({
        inputs: {
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
        passwordInputsValid: false,
    });

    const [infoInputsError, setInfoInputsError] = useState();
    const [passwordInputsError, setPasswordInputsError] = useState();

    const usernameRef = useRef();
    const currentPasswordRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const avatarRef = useRef();

    const handleInfoInputsChange = (e) => {
        setInfoInputs((prev) => ({
            ...prev,
            inputs: {
                ...prev.inputs,
                [e.target.name]: e.target.value,
            },
            infoInputsValid: usernameRef.current.value !== '',
        }));
    };

    const handlePasswordInputsChange = (e) => {
        setPasswordInputs((prev) => ({
            ...prev,
            inputs: {
                ...prev.inputs,
                [e.target.name]: e.target.value,
            },
            passwordInputsValid:
                currentPasswordRef.current.value !== '' &&
                passwordRef.current.value !== '' &&
                confirmPasswordRef.current.value !== '',
        }));
    };

    const uploadFile = useCallback((file) => {
        const storage = getStorage(app);

        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, 'users/avatars/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log(`Upload is running`);
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // // Handle successful uploads on complete
                // // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUploadAvatarSuccessfully(true);
                    setAvatarUrl(downloadURL);
                    avatarRef.current.src = downloadURL;
                    setInfoInputs((prev) => ({ ...prev, infoInputsValid: usernameRef.current.value !== '' }));
                });
            },
        );
    }, []);

    const handleChangeAvatarFileUpload = (e) => {
        if (e.target.files?.length > 0) {
            setAvatarFile(e.target.files[0]);
        }
    };

    const handleChangeInfo = async (e) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };
        try {
            const res = await axios.patch(
                'http://localhost:8800/api/users/update-informations',
                {
                    ...infoInputs.inputs,
                    avatarUrl,
                },
                config,
            );

            if (res.status === 200) {
                // navigate(routes.profile.replace(':userId', res.data.data._id));
                toast.success('Cập nhật thông tin thành công!', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                dispatch(replaceUserData(res.data.data));
            }
        } catch (error) {
            setInfoInputsError(error.message);
            console.log(error);
        }
    };

    const handleChangePassword = async (e) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };
        try {
            const res = await axios.patch(
                'http://localhost:8800/api/auth/change-password',
                {
                    ...passwordInputs.inputs,
                },
                config,
            );

            if (res.status === 200) {
                toast.success('Cập nhật thông tin thành công!', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                await axios.get('http://localhost:8800/api/auth/signout');
                dispatch(logout());
            } else {
                setPasswordInputsError(res.data.message);
            }
        } catch (error) {
            setPasswordInputsError(error.response.data.message);
            console.log(error);
        }
    };

    useEffect(() => {
        avatarFile && uploadFile(avatarFile);
    }, [avatarFile, uploadFile]);

    return (
        <div className={cx('wrapper')}>
            {/* USER INFO CHANGE */}
            <div className={cx('row')}>
                <label className={cx('left')}>
                    <input type="file" />
                    <img ref={avatarRef} className={cx('avatar')} src={user.currentUser.avatarUrl} alt="" />
                </label>

                <div className={cx('right')}>
                    <h5 className={cx('username')}>{user.currentUser.username}</h5>
                    <label className={cx('avatar-input')}>
                        Đổi ảnh đại diện
                        <input onChange={handleChangeAvatarFileUpload} accept="image/*" id="avatarUrl" type="file" />
                    </label>
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('left')}>
                    <label htmlFor="username">Tên</label>
                </div>

                <div className={cx('right')}>
                    <input
                        onChange={handleInfoInputsChange}
                        name="username"
                        id="username"
                        ref={usernameRef}
                        value={infoInputs.inputs.username}
                    />
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('left')}>
                    <label htmlFor="address">Địa chỉ</label>
                </div>

                <div className={cx('right')}>
                    <input
                        onChange={handleInfoInputsChange}
                        name="address"
                        id="address"
                        value={infoInputs.inputs.address}
                    />
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('left')}>
                    <label htmlFor="phoneNumber">Số điện thoại</label>
                </div>

                <div className={cx('right')}>
                    <input
                        onChange={handleInfoInputsChange}
                        name="phoneNumber"
                        id="phoneNumber"
                        value={infoInputs.inputs.phoneNumber}
                    />
                </div>
            </div>

            {infoInputsError && (
                <div className={cx('row')}>
                    <div className={cx('left')}></div>

                    <div className={cx('right')}>
                        <div className={cx('feedback')}>{infoInputsError}</div>
                    </div>
                </div>
            )}

            <div className={cx('row')}>
                <div className={cx('left')}></div>

                <div className={cx('right')}>
                    <button
                        onClick={handleChangeInfo}
                        className={cx('submit-btn', { formIsNotValid: !infoInputs.infoInputsValid })}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>

            <div className={cx('line')}>
                <hr />
            </div>

            {/* CHANGE PASSWORD */}
            <div className={cx('row')}>
                <div className={cx('left')}></div>

                <div className={cx('right')}>
                    <h6 className={cx('username')}>Đổi mật khẩu</h6>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('left')}>
                    <label htmlFor="currentPassword">Mật khẩu cũ</label>
                </div>

                <div className={cx('right')}>
                    <input
                        ref={currentPasswordRef}
                        value={passwordInputs.inputs.currentPassword}
                        onChange={handlePasswordInputsChange}
                        name="currentPassword"
                        type="password"
                        id="currentPassword"
                    />
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('left')}>
                    <label htmlFor="password">Mật khẩu mới</label>
                </div>

                <div className={cx('right')}>
                    <input
                        ref={passwordRef}
                        value={passwordInputs.inputs.password}
                        onChange={handlePasswordInputsChange}
                        name="password"
                        type="password"
                        id="password"
                    />
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('left')}>
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                </div>

                <div className={cx('right')}>
                    <input
                        ref={confirmPasswordRef}
                        value={passwordInputs.inputs.confirmPassword}
                        onChange={handlePasswordInputsChange}
                        name="confirmPassword"
                        type="password"
                        id="confirmPassword"
                    />
                </div>
            </div>

            {passwordInputsError && (
                <div className={cx('row')}>
                    <div className={cx('left')}></div>

                    <div className={cx('right')}>
                        <div className={cx('feedback')}>{passwordInputsError}</div>
                    </div>
                </div>
            )}

            <div className={cx('row')}>
                <div className={cx('left')}></div>

                <div className={cx('right')}>
                    <button
                        onClick={handleChangePassword}
                        className={cx('submit-btn', { formIsNotValid: !passwordInputs.passwordInputsValid })}
                    >
                        Đổi mật khẩu
                    </button>
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
        </div>
    );
};

export default ChangeInfo;
