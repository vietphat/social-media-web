import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Content from './Content';
import { MoreIcon, NotificationsIcon, LikedIcon, MessagesIcon, CommentIcon } from '~/components/Icons';
import routes from '~/config/routes';
import PostModal from '~/components/PostModal';
import useModal from '~/hooks/useModal';
import styles from './Posts.module.scss';
import { likePost, unlikePost } from '~/store';
import LikedUsersCardModal from '../UserCardModal/LikedUserCardModal';

const cx = classNames.bind(styles);

const PostItem = (props) => {
    const user = useSelector((state) => state.user);
    const [likedUserCardListShown, setLikedUserCardListShown] = useState(false);
    const [isLikedPost, setIsLikedPost] = useState(
        props.post.likes.findIndex((like) => like._id === user.currentUser._id) !== -1,
    );

    const { isShowing, toggle } = useModal();

    const dispatch = useDispatch();

    const handleLikePost = async (postId) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };

        try {
            const res = await axios.patch(`http://localhost:8800/api/posts/like/${postId}`, {}, config);
            setIsLikedPost(true);
            if (res.status === 200) {
                dispatch(likePost(res.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnlikePost = async (postId) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };

        try {
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
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowLikedUsers = () => {
        setLikedUserCardListShown(true);
    };
    return (
        <Fragment>
            {likedUserCardListShown && (
                <LikedUsersCardModal
                    hide={() => setLikedUserCardListShown(false)}
                    title="Thích"
                    items={props.post.likes}
                    own={props.post.createdBy._id === user.currentUser._id}
                />
            )}
            <PostModal
                isLikedPost={isLikedPost}
                onLikePost={handleLikePost}
                onUnlikePost={handleUnlikePost}
                isShowing={isShowing}
                hide={toggle}
                {...props.post}
            />
            <div className={cx('post-item')}>
                <div className={cx('header')}>
                    <div className={cx('owner-info')}>
                        <Link to={routes.profile.replace(':userId', props.post.createdBy._id)}>
                            <img src={props.post.createdBy.avatarUrl} alt="owner" />
                        </Link>
                        <Link
                            className={cx('username')}
                            to={routes.profile.replace(':userId', props.post.createdBy._id)}
                        >
                            {props.post.createdBy.username}
                        </Link>
                    </div>
                    <div className={cx('more-btn')}>
                        <MoreIcon />
                    </div>
                </div>

                <div className={cx('body')}>
                    <Content mediaUrls={props.post.mediaUrls} />
                </div>

                <div className={cx('footer')}>
                    <div className={cx('actions')}>
                        {!isLikedPost ? (
                            <NotificationsIcon
                                className={cx('like-icon')}
                                onClick={() => handleLikePost(props.post._id)}
                            />
                        ) : (
                            <LikedIcon className={cx('like-icon')} onClick={() => handleUnlikePost(props.post._id)} />
                        )}
                        <CommentIcon onClick={toggle} />
                        <MessagesIcon />
                    </div>

                    <h5 onClick={handleShowLikedUsers}>{props.post.likes.length} người thích</h5>

                    <p>{props.post.createdBy.username + ': ' + props.post.description}</p>

                    <span>{format(props.post.createdAt)}</span>
                </div>
            </div>
        </Fragment>
    );
};

export default PostItem;
