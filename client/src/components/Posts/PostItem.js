import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Content from './Content';
import { MoreIcon, NotificationsIcon, MessagesIcon, CommentIcon } from '~/components/Icons';
import routes from '~/config/routes';
import styles from './Posts.module.scss';

const cx = classNames.bind(styles);

const PostItem = ({ createdBy, mediaUrls }) => {
    return (
        <div className={cx('post-item')}>
            <div className={cx('header')}>
                <div className={cx('owner-info')}>
                    <Link to={routes.profile}>
                        <img src="./bjorn.jpg" alt="owner" />
                    </Link>
                    <Link className={cx('username')} to={routes.profile}>
                        {createdBy.username}
                    </Link>
                </div>
                <div className={cx('more-btn')}>
                    <MoreIcon />
                </div>
            </div>

            <div className={cx('body')}>
                <Content mediaUrls={mediaUrls} />
            </div>

            <div className={cx('footer')}>
                <div className={cx('actions')}>
                    <NotificationsIcon />
                    <CommentIcon />
                    <MessagesIcon />
                </div>

                <h5>132,758 người thích</h5>

                <p>{createdBy.username} vừa đăng trạng thái mới</p>

                <span>19 ngày trước</span>
            </div>
        </div>
    );
};

export default PostItem;
