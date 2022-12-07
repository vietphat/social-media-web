import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';

import { NotificationsIcon } from '../Icons';
import styles from './PostModal.module.scss';

const cx = classNames.bind(styles);

const Comment = ({ comment }) => {
    return (
        <div className={cx('comment')}>
            <div className={cx('owner-avatar')}>
                <Link to={routes.profile.replace(':userId', comment.createdBy._id)}>
                    <img src={comment.createdBy.avatarUrl} alt="avatar" />
                </Link>
            </div>

            <div className={cx('main')}>
                <div className={cx('top')}>
                    <span>
                        <Link to={routes.profile.replace(':userId', comment.createdBy._id)}>
                            {comment.createdBy.username}
                        </Link>
                        &nbsp;&nbsp;{comment.description}
                    </span>
                </div>
                <div className={cx('bottom')}>
                    <span>3h</span>
                    {/* <span>{comment.createdAt}</span> */}
                    <h6>{comment.likes.length} người thích</h6>
                </div>
            </div>

            <div className={cx('like-comment')}>
                <NotificationsIcon width="1.6rem" height="1.6rem" />
            </div>
        </div>
    );
};

export default Comment;
