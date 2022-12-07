import React from 'react';
import classNames from 'classnames/bind';

import { NotificationsIcon, CommentIcon } from '~/components/Icons';
import PostModal from '~/components/PostModal';
import useModal from '~/hooks/useModal';
import styles from './UserPostItem.module.scss';

const cx = classNames.bind(styles);

const UserPostItem = ({ post }) => {
    const { isShowing, toggle } = useModal();

    function checkImageURL(url) {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    }

    let content;
    if (checkImageURL(post.mediaUrls[0])) {
        content = <img src={post.mediaUrls[0]} alt="user-post-item" />;
    } else {
        content = <video src={post.mediaUrls[0]} />;
    }

    return (
        <React.Fragment>
            <PostModal
                isShowing={isShowing}
                hide={toggle}
                comments={post.comments}
                createdBy={post.createdBy}
                mediaUrls={post.mediaUrls}
            />
            <div onClick={toggle} className={cx('user-post-item')}>
                <div className={cx('interactions-container')}>
                    <div className={cx('interactions')}>
                        <NotificationsIcon />
                        <span>{post.likes.length}</span>
                    </div>
                    <div className={cx('interactions')}>
                        <CommentIcon />
                        <span>{post.likes.length}</span>
                    </div>
                </div>
                {content}
            </div>
        </React.Fragment>
    );
};

export default UserPostItem;
