import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Fragment, useState } from 'react';

import UserPostItem from './UserPostItem';
import routes from '~/config/routes';
import { AddFriendIcon, PostsIcon } from '~/components/Icons';
import styles from './Profile.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const userdata = {
    _id: '638b8bb4e03ad60223dd7089',
    email: 'walter@gmail.com',
    username: 'Walter White',
    avatarUrl: '/bjorn.jpg',
    coverImageUrl: 'abc.jpeg',
    phoneNumber: '0947773536',
    address: 'New Mexico',
    posts: [
        {
            _id: '638cb4a6ec1f185b6a6c46b8',
            createdBy: {
                _id: '638b8bb4e03ad60223dd7089',
                username: 'Walter White',
                avatarUrl: 'default-avatar.jpg',
            },
            description: 'Bla Bla bLa blA',
            mediaUrls: [
                'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
                'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
                'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
            ],
            likes: [],
            createdAt: '2022-12-04T14:54:30.144Z',
            updatedAt: '2022-12-04T14:54:30.144Z',
            __v: 0,
            comments: [],
        },
        {
            _id: '638cb463ec1f185b6a6c46af',
            createdBy: {
                _id: '638ca60d4ebc22621fcae982',
                username: 'Skyler White',
                avatarUrl: 'default-avatar.jpg',
            },
            description: "I'm Mrs.White yo. Mr.White is my husband yo.",
            mediaUrls: [
                'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
                'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
                'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
            ],
            likes: [],
            createdAt: '2022-12-04T14:53:23.749Z',
            updatedAt: '2022-12-04T16:53:38.568Z',
            __v: 0,
            comments: [
                {
                    _id: '638cd0920941f81faddb8ecc',
                    createdBy: {
                        _id: '638b8bb4e03ad60223dd7089',
                        username: 'Walter White',
                        avatarUrl: 'default-avatar.jpg',
                    },
                    description: '????',
                    createdAt: '2022-12-04T16:53:38.523Z',
                },
            ],
        },
        {
            _id: '638cb463ec1f185b6a6c46asd',
            createdBy: {
                _id: '638ca60d4ebc22621fcae982',
                username: 'Skyler White',
                avatarUrl: 'default-avatar.jpg',
            },
            description: "I'm Mrs.White yo. Mr.White is my husband yo.",
            mediaUrls: [
                'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
                'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
                'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
            ],
            likes: [],
            createdAt: '2022-12-04T14:53:23.749Z',
            updatedAt: '2022-12-04T16:53:38.568Z',
            __v: 0,
            comments: [
                {
                    _id: '638cd0920941f81faddb8ecc',
                    createdBy: {
                        _id: '638b8bb4e03ad60223dd7089',
                        username: 'Walter White',
                        avatarUrl: 'default-avatar.jpg',
                    },
                    description: '????',
                    createdAt: '2022-12-04T16:53:38.523Z',
                },
            ],
        },
        {
            _id: '638cadc378175fb10cc2bdce',
            createdBy: {
                _id: '638b8bb4e03ad60223dd7089',
                username: 'Walter White',
                avatarUrl: 'default-avatar.jpg',
            },
            description: "I'm not in danger Skyler. I'm the danger.",
            mediaUrls: [
                'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
                'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
                'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
            ],
            likes: [
                {
                    _id: '638b8bb4e03ad60223dd7089',
                    username: 'Walter White',
                    avatarUrl: 'default-avatar.jpg',
                },
            ],
            createdAt: '2022-12-04T14:25:07.708Z',
            updatedAt: '2022-12-04T14:25:32.005Z',
            __v: 1,
            comments: [],
        },
        {
            _id: '638cadc378175fb10cc2bdcw',
            createdBy: {
                _id: '638b8bb4e03ad60223dd7089',
                username: 'Walter White',
                avatarUrl: 'default-avatar.jpg',
            },
            description: "I'm not in danger Skyler. I'm the danger.",
            mediaUrls: [
                'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
                'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
                'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
            ],
            likes: [
                {
                    _id: '638b8bb4e03ad60223dd7089',
                    username: 'Walter White',
                    avatarUrl: 'default-avatar.jpg',
                },
            ],
            createdAt: '2022-12-04T14:25:07.708Z',
            updatedAt: '2022-12-04T14:25:32.005Z',
            __v: 1,
            comments: [],
        },
        {
            _id: '6cadc378175fb10cc2bdcw',
            createdBy: {
                _id: '638b8bb4e03ad60223dd7089',
                username: 'Walter White',
                avatarUrl: 'default-avatar.jpg',
            },
            description: "I'm not in danger Skyler. I'm the danger.",
            mediaUrls: [
                'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
                'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
                'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
            ],
            likes: [
                {
                    _id: '638b8bb4e03ad60223dd7089',
                    username: 'Walter White',
                    avatarUrl: 'default-avatar.jpg',
                },
            ],
            createdAt: '2022-12-04T14:25:07.708Z',
            updatedAt: '2022-12-04T14:25:32.005Z',
            __v: 1,
            comments: [],
        },
        {
            _id: '638cadc378175fb2bdcw',
            createdBy: {
                _id: '638b8bb4e03ad60223dd7089',
                username: 'Walter White',
                avatarUrl: 'default-avatar.jpg',
            },
            description: "I'm not in danger Skyler. I'm the danger.",
            mediaUrls: [
                'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
                'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
                'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
            ],
            likes: [
                {
                    _id: '638b8bb4e03ad60223dd7089',
                    username: 'Walter White',
                    avatarUrl: 'default-avatar.jpg',
                },
            ],
            createdAt: '2022-12-04T14:25:07.708Z',
            updatedAt: '2022-12-04T14:25:32.005Z',
            __v: 1,
            comments: [],
        },
        {
            _id: '638cadc378175fb10cc2b',
            createdBy: {
                _id: '638b8bb4e03ad60223dd7089',
                username: 'Walter White',
                avatarUrl: 'default-avatar.jpg',
            },
            description: "I'm not in danger Skyler. I'm the danger.",
            mediaUrls: [
                'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
                'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
                'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
            ],
            likes: [
                {
                    _id: '638b8bb4e03ad60223dd7089',
                    username: 'Walter White',
                    avatarUrl: 'default-avatar.jpg',
                },
            ],
            createdAt: '2022-12-04T14:25:07.708Z',
            updatedAt: '2022-12-04T14:25:32.005Z',
            __v: 1,
            comments: [],
        },
    ],
    followers: [
        {
            _id: '638ca60d4ebc22621fcae982',
            username: 'Skyler White',
            avatarUrl: 'default-avatar.jpg',
        },
    ],
    following: [
        {
            _id: '638ca60d4ebc22621fcae982',
            username: 'Skyler White',
            avatarUrl: 'default-avatar.jpg',
        },
        {
            _id: '638ca60d4ebc22621fcae982',
            username: 'Skyler White',
            avatarUrl: 'default-avatar.jpg',
        },
    ],
    friendsList: [],
    friendRequestsSent: ['638ca60d4ebc22621fcae982'],
    friendRequestsReceived: [],
    createdAt: '2022-12-03T17:47:32.560Z',
    updatedAt: '2022-12-06T16:51:10.140Z',
    __v: 0,
};

const Profile = () => {
    const user = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState();

    const { userId } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await axios.get(`http://localhost:8800/api/users/${userId}`);

            if (res.status === 200) {
                setUserInfo(res.data.data.user);
            }
        };

        userId !== user.currentUser._id ? fetchUserData() : setUserInfo(user.currentUser);
    }, [userId, user]);

    console.log('user', userInfo);

    return (
        <Fragment>
            {userInfo ? (
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <div className={cx('avatar')}>
                            <img src={userInfo.avatarUrl} alt="avatar" />
                        </div>

                        <div className={cx('info')}>
                            <div className={cx('actions')}>
                                <h4 className={cx('username')}>{userInfo.username}</h4>

                                <div className={cx('action-btns')}>
                                    {user.currentUser.following.includes(userInfo._id) ? (
                                        <button className={cx('follow-btn')}>Bỏ theo dõi</button>
                                    ) : (
                                        <button className={cx('follow-btn')}>Theo dõi</button>
                                    )}

                                    <Link className={cx('inbox-btn')} to={`${routes.profile}/${userInfo._id}`}>
                                        Nhắn tin
                                    </Link>
                                    <button className={cx('add-friend-btn')}>
                                        <AddFriendIcon />
                                        {/* Hủy kết bạn */}
                                    </button>
                                </div>
                            </div>

                            <div className={cx('views')}>
                                <h4>
                                    <b>{userInfo.posts.length}</b>
                                    <span> bài đăng</span>
                                </h4>
                                <h4>
                                    <b>{userInfo.followers.length}</b>
                                    <span> người theo dõi</span>
                                </h4>
                                <h4>
                                    <b>{userInfo.following.length}</b>
                                    <span> đang theo dõi</span>
                                </h4>
                            </div>

                            <div className={cx('others')}>
                                <span>{userInfo.address}</span>
                                <span>{userInfo.phoneNumber}</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('posts')}>
                        <div className={cx('posts-btn')}>
                            <PostsIcon />
                            <span>BÀI VIẾT</span>
                        </div>

                        <div className={cx('posts-list')}>
                            {userInfo.posts.length > 0 ? (
                                userInfo.posts.map((post) => <UserPostItem key={post._id} post={post} />)
                            ) : (
                                <h2>Không có bài viết</h2>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </Fragment>
    );
};

export default Profile;
