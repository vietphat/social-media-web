import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

import Content from './Content';
import { MoreIcon, NotificationsIcon, MessagesIcon, CommentIcon } from '~/components/Icons';
import routes from '~/config/routes';
import PostModal from '~/components/PostModal';
import useModal from '~/hooks/useModal';
import styles from './Posts.module.scss';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

const PostItem = (props) => {
    const { isShowing, toggle } = useModal();
    return (
        <Fragment>
            <PostModal isShowing={isShowing} hide={toggle} {...props.post} />
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
                        <NotificationsIcon />
                        <CommentIcon onClick={toggle} />
                        <MessagesIcon />
                    </div>

                    <h5>{props.post.likes.length} người thích</h5>

                    <p>{props.post.createdBy.username + ': ' + props.post.description}</p>

                    <span>{format(props.post.createdAt)}</span>
                </div>
            </div>
        </Fragment>
    );
};

export default PostItem;
