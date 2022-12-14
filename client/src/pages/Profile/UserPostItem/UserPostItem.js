import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { likePost, unlikePost } from '~/store';
import { NotificationsIcon, CommentIcon } from '~/components/Icons';
import PostModal from '~/components/PostModal';
import useModal from '~/hooks/useModal';
import styles from './UserPostItem.module.scss';

const cx = classNames.bind(styles);

// const UserPostItem = ({ isLikedPost, onLikePost, post }) => {
const UserPostItem = (props) => {
    const user = useSelector((state) => state.user);
    const { isShowing, toggle } = useModal();
    const [isLikedPost, setIsLikedPost] = useState(
        props.post.likes.findIndex((like) => like._id === user.currentUser._id) !== -1,
    );

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

    function checkImageURL(url) {
        return /jpg|png|jpeg/.test(url);
    }

    let content;
    if (checkImageURL(props.post.mediaUrls[0])) {
        content = <img src={props.post.mediaUrls[0]} alt="user-post-item" />;
    } else {
        content = <video src={props.post.mediaUrls[0]} />;
    }

    return (
        <React.Fragment>
            <PostModal
                isLikedPost={isLikedPost}
                onLikePost={() => handleLikePost(props.post._id)}
                onUnlikePost={() => handleUnlikePost(props.post._id)}
                isShowing={isShowing}
                hide={toggle}
                {...props.post}
            />
            <div onClick={toggle} className={cx('user-post-item')}>
                <div className={cx('interactions-container')}>
                    <div className={cx('interactions')}>
                        <NotificationsIcon />
                        <span>{props.post.likes.length}</span>
                    </div>
                    <div className={cx('interactions')}>
                        <CommentIcon />
                        <span>{props.post.likes.length}</span>
                    </div>
                </div>
                {content}
            </div>
        </React.Fragment>
    );
};

export default UserPostItem;
