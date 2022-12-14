import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { faImages, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { createPost } from '~/store';
import app from '~/utils/firebase';
import routes from '~/config/routes';
import styles from './UploadPost.module.scss';

const cx = classNames.bind(styles);

const UploadPost = () => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [mediaFiles, setMediaFiles] = useState();
    const [mediaUrls, setMediaUrls] = useState([]);
    const [uploadedFilesSuccessfully, setUploadFilesSuccessfully] = useState(false);
    const [description, setDescription] = useState('');
    const [fileIsBeingUploaded, setFileIsBeingUploaded] = useState(false);

    const handleChangeMediaFilesUpload = (e) => {
        if (e.target.files?.length > 0) {
            setMediaFiles(e.target.files);
        }
    };

    const uploadFiles = useCallback(
        (files) => {
            const storage = getStorage(app);

            setFileIsBeingUploaded(true);
            let fileCount = 0;
            Array.from(files).forEach((file, index) => {
                const fileName = new Date().getTime() + file.name;
                const storageRef = ref(storage, 'posts/media/' + fileName);

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
                        if (progress === 100) fileCount++;
                        setUploadFilesSuccessfully(progress === 100 && fileCount === files.length);
                        setFileIsBeingUploaded(!(fileCount === files.length));

                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log(`Upload is running (${index})`);
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
                            // setUploadMediaSuccessfully(true);
                            setMediaUrls((prev) => prev.concat(downloadURL));
                        });
                    },
                );
            });
        },
        [setMediaUrls],
    );

    useEffect(() => {
        mediaFiles && uploadFiles(mediaFiles);
    }, [mediaFiles, uploadFiles]);

    const handleCreatePost = async () => {
        const res = await axios.post(
            'http://localhost:8800/api/posts/create',
            {
                description,
                mediaUrls: mediaUrls,
            },
            {
                headers: { Authorization: 'Bearer ' + user.jwt },
            },
        );

        if (res.status === 201) {
            toast.success('Đăng bài thành công!', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            setDescription('');
            setMediaFiles(null);
            setMediaUrls([]);
            dispatch(createPost(res.data.data));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <Link to={routes.profile.replace(':userId', user.currentUser._id)}>
                    <img src={user.currentUser.avatarUrl} alt="avatar" />
                </Link>

                <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    placeholder="Bạn đang nghĩ gì?"
                    id="description"
                />
            </div>
            <div className={cx('bottom')}>
                {!fileIsBeingUploaded ? (
                    <label>
                        <input
                            onChange={handleChangeMediaFilesUpload}
                            type="file"
                            id="mediaUrls"
                            accept="image/*, video/*"
                            multiple
                        />
                        <FontAwesomeIcon icon={faImages} />
                        <span>Hình/video</span>
                    </label>
                ) : (
                    <div className={cx('loading-container')}>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    </div>
                )}

                {description?.length > 0 && mediaUrls.length > 0 && uploadedFilesSuccessfully && (
                    <button onClick={handleCreatePost}>Đăng</button>
                )}
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

export default UploadPost;
