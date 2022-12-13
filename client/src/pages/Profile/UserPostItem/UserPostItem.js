import React from 'react';
import classNames from 'classnames/bind';

import { NotificationsIcon, CommentIcon } from '~/components/Icons';
import PostModal from '~/components/PostModal';
import useModal from '~/hooks/useModal';
import styles from './UserPostItem.module.scss';

const cx = classNames.bind(styles);

// const UserPostItem = ({ isLikedPost, onLikePost, post }) => {
const UserPostItem = (props) => {
    const { isShowing, toggle } = useModal();

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
                isLikedPost={props.isLikedPost}
                onLikePost={props.onLikePost}
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
