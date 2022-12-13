import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Fragment, useState } from 'react';

import { setTimelinePosts } from '~/store';
import { follow, likePost, unfollow, unlikePost } from '~/store';
import UserPostItem from './UserPostItem';
import routes from '~/config/routes';
import { AddFriendIcon, PostsIcon } from '~/components/Icons';
import styles from './Profile.module.scss';
import { useEffect } from 'react';
import UsersListModal from '~/components/UsersListModal';

const cx = classNames.bind(styles);

const Profile = () => {
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.timeline.posts);
    const [userInfo, setUserInfo] = useState();
    const [followingCardShown, setFollowingCardShown] = useState();
    const [followersCardShown, setFollowersCardShown] = useState();
    const [isLikedPost, setIsLikedPost] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await axios.get(`http://localhost:8800/api/users/${userId}`);

            if (res.status === 200) {
                setUserInfo(res.data.data.user);
                dispatch(setTimelinePosts(res.data.data.user.posts));
            }
        };

        if (userId !== user.currentUser._id) {
            fetchUserData();
        } else {
            setUserInfo(user.currentUser);
            dispatch(setTimelinePosts(user.currentUser.posts));
        }
    }, [userId, user, dispatch]);

    const handleLikePost = async (postId) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };

        try {
            const likedPost = posts.find((post) => post._id === postId);
            const likedUserIndex = likedPost.likes.findIndex((like) => like._id === user.currentUser._id);

            console.log(likedUserIndex);
            if (likedUserIndex === -1) {
                const res = await axios.patch(`http://localhost:8800/api/posts/like/${postId}`, {}, config);
                setIsLikedPost(true);
                if (res.status === 200) {
                    dispatch(likePost(res.data.data));
                }
            } else {
                const res = await axios.patch(`http://localhost:8800/api/posts/unlike/${postId}`, {}, config);
                setIsLikedPost(false);
                if (res.status === 200) {
                    dispatch(
                        unlikePost({
                            postId,
                            userId: res.data.data._id,
                        }),
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFollowAUser = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };
        try {
            const res = await axios.patch(`http://localhost:8800/api/users/follow/${userId}`, {}, config);

            if (res.status === 200) {
                console.log('Theo dõi người dùng thành công');
                dispatch(follow(res.data.data.following));
            }
        } catch (error) {
            console.log('có lỗi', error);
        }
    };

    const handleUnfollowAUser = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };
        try {
            const res = await axios.patch(`http://localhost:8800/api/users/unfollow/${userId}`, {}, config);

            if (res.status === 200) {
                console.log('Bỏ theo dõi người dùng thành công');
                dispatch(unfollow(userId));
            }
        } catch (error) {
            console.log('có lỗi', error);
        }
    };

    const handleCreateConversation = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };

        try {
            const res = await axios.post(
                'http://localhost:8800/api/conversations/create',
                {
                    receiver: userId,
                },
                config,
            );

            if (res.status === 201) {
                navigate(routes.chatbox.replace(':conversationId', res.data.data._id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    let followComponent;
    if (!(userInfo?._id === user.currentUser._id)) {
        user.currentUser.following.includes(userInfo?._id)
            ? (followComponent = (
                  <button onClick={handleUnfollowAUser} className={cx('follow-btn')}>
                      Bỏ theo dõi
                  </button>
              ))
            : (followComponent = (
                  <button onClick={handleFollowAUser} className={cx('follow-btn')}>
                      Theo dõi
                  </button>
              ));
    } else {
        followComponent = (
            <Link to={routes.changeInfo} className={cx('follow-btn')}>
                Sửa thông tin cá nhân
            </Link>
        );
    }

    let addFriendComponent;
    if (!(userInfo?._id === user.currentUser._id)) {
        addFriendComponent = (
            <>
                {' '}
                <button onClick={handleCreateConversation} className={cx('inbox-btn')}>
                    Nhắn tin
                </button>
                <button className={cx('add-friend-btn')}>
                    <AddFriendIcon />
                    {/* Hủy kết bạn */}
                </button>
            </>
        );
    }

    return (
        <Fragment>
            {followingCardShown && (
                <UsersListModal
                    title="Đang theo dõi"
                    hide={() => setFollowingCardShown(false)}
                    items={userInfo.following}
                    own={userInfo._id === user.currentUser._id}
                />
            )}
            {followersCardShown && (
                <UsersListModal
                    title="Người theo dõi"
                    hide={() => setFollowersCardShown(false)}
                    items={userInfo.followers}
                    own={userInfo._id === user.currentUser._id}
                />
            )}
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
                                    {followComponent}
                                    {addFriendComponent}
                                </div>
                            </div>

                            <div className={cx('views')}>
                                <h4>
                                    <b>{userInfo.posts.length}</b>
                                    <span> bài đăng</span>
                                </h4>
                                <h4 onClick={() => setFollowersCardShown(true)}>
                                    <b>{userInfo.followers.length}</b>
                                    <span> người theo dõi</span>
                                </h4>
                                <h4 onClick={() => setFollowingCardShown(true)}>
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
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <UserPostItem
                                        isLikedPost={isLikedPost}
                                        onLikePost={() => handleLikePost(post._id)}
                                        key={post._id}
                                        post={post}
                                    />
                                ))
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
