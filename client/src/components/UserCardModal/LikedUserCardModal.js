import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { follow, unfollow } from '~/store';
import styles from './LikedUserCardModal.module.scss';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

const LikedUsersCardModal = ({ hide, title, items }) => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleFollowAUser = async (_id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };
        try {
            const res = await axios.patch(`http://localhost:8800/api/users/follow/${_id}`, {}, config);

            if (res.status === 200) {
                console.log('Theo dõi người dùng thành công');
                dispatch(follow(res.data.data.following));
            }
        } catch (error) {
            console.log('có lỗi', error);
        }
    };

    const handleUnfollowAUser = async (_id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };
        try {
            const res = await axios.patch(`http://localhost:8800/api/users/unfollow/${_id}`, {}, config);

            if (res.status === 200) {
                console.log('Bỏ theo dõi người dùng thành công');
                dispatch(unfollow(_id));
            }
        } catch (error) {
            console.log('có lỗi', error);
        }
    };

    return ReactDOM.createPortal(
        <React.Fragment>
            <div className={cx('overlay')} onClick={hide} />
            <div className={cx('wrapper')}>
                <div className={cx('header')}>{title}</div>

                <div className={cx('body')}>
                    {items.map((item) => (
                        <div key={item._id} className={cx('user-item')}>
                            <Link className={cx('avatar')} to={routes.profile.replace(':userId', item._id)}>
                                <img src={item.avatarUrl} alt="avatar" />
                            </Link>

                            <div className={cx('name')}>
                                <Link to={routes.profile.replace(':userId', item._id)}>{item.username}</Link>
                                {item._id === user.currentUser._id ? (
                                    <></>
                                ) : user.currentUser.following.findIndex((userItem) => userItem === item._id) !== -1 ? (
                                    <button
                                        onClick={() => {
                                            handleUnfollowAUser(item._id);
                                        }}
                                    >
                                        Bỏ theo dõi
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            handleFollowAUser(item._id);
                                        }}
                                    >
                                        Theo dõi
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>,
        document.getElementById('liked-users-card-hook'),
    );
};

export default LikedUsersCardModal;
