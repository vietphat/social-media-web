import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import routes from '~/config/routes';
import Content from '~/components/Posts/Content';
import Comment from './Comment';
import styles from './PostModal.module.scss';
import { CommentIcon, HappyFaceIcon, MessagesIcon, NotificationsIcon } from '../Icons';
import { format } from 'timeago.js/lib/format';

const cx = classNames.bind(styles);

const PostModal = ({ isShowing, hide, ...props }) => {
    let modal;
    if (isShowing) {
        modal = ReactDOM.createPortal(
            <React.Fragment>
                <div className={cx('overlay')} onClick={hide} />
                <div className={cx('wrapper')}>
                    <div className={cx('content-container')}>
                        <Content mediaUrls={props.mediaUrls} />
                    </div>
                    <div className={cx('comments-container')}>
                        <header className={cx('header')}>
                            <Link className={cx('owner-link')} to={`${routes.profile}/${props.createdBy._id}`}>
                                <img src={props.createdBy.avatarUrl} alt="avatar" />
                                <h5>{props.createdBy.username}</h5>
                            </Link>
                            <button className={cx('close-btn')} onClick={hide}>
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </header>

                        <div className={cx('body')}>
                            <div className={cx('comments')}>
                                {props.comments.map((comment) => (
                                    <Comment key={comment._id} comment={comment} />
                                ))}
                            </div>
                        </div>

                        <div className={cx('footer')}>
                            <div className={cx('actions')}>
                                <NotificationsIcon />
                                <CommentIcon />
                                <MessagesIcon />
                            </div>

                            <h5>{props.likes.length} người thích</h5>

                            <p>{props.description}</p>

                            <span>{format(props.createdAt)}</span>
                        </div>

                        <div className={cx('message-box')}>
                            <div className={cx('message-input')}>
                                <div className={cx('choose-emoji-btn')}>
                                    <HappyFaceIcon />
                                </div>
                                <div className={cx('enter')}>
                                    <input type="text" placeholder="Thêm bình luận..." />
                                    <button>Đăng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.getElementById('post-item-hook'),
        );
    }

    return modal;
};

export default PostModal;
