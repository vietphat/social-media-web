import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import routes from '~/config/routes';
import Content from '~/components/Posts/Content';
import Comment from './Comment';
import styles from './PostModal.module.scss';
import { CommentIcon, HappyFaceIcon, MessagesIcon, NotificationsIcon, LikedIcon } from '../Icons';
import { format } from 'timeago.js/lib/format';
import { addComment } from '~/store';

const cx = classNames.bind(styles);

const PostModal = ({ isLikedPost, onLikePost, onUnlikePost, isShowing, hide, ...props }) => {
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.timeline.posts);
    const [commentInput, setCommentInput] = useState('');

    const commentsRef = useRef();

    const dispatch = useDispatch();

    const handleAddComment = async (postId) => {
        if (commentInput.trim() === '') return;
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };

        try {
            const res = await axios.post(
                `http://localhost:8800/api/comments/create/${postId}`,
                {
                    description: commentInput,
                },
                config,
            );

            const postIndex = posts.findIndex((post) => post._id === postId);

            if (res.status === 201) {
                setCommentInput('');

                dispatch(
                    addComment({
                        postIndex,
                        comment: res.data.data,
                    }),
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { comments } = props;
    const { length } = comments;
    useEffect(() => {
        commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [length]);

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
                                    <div key={comment._id} ref={commentsRef}>
                                        <Comment key={comment._id} comment={comment} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={cx('footer')}>
                            <div className={cx('actions')}>
                                {!isLikedPost ? (
                                    <NotificationsIcon
                                        className={cx('like-icon')}
                                        onClick={() => onLikePost(props._id)}
                                    />
                                ) : (
                                    <LikedIcon className={cx('like-icon')} onClick={() => onUnlikePost(props._id)} />
                                )}
                                <CommentIcon />
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
                                    <input
                                        onKeyDown={(e) => {
                                            e.key === 'Enter' && handleAddComment(props._id);
                                        }}
                                        value={commentInput}
                                        onChange={(e) => setCommentInput(e.target.value)}
                                        type="text"
                                        placeholder="Thêm bình luận..."
                                    />
                                    <button onClick={() => handleAddComment(props._id)}>Đăng</button>
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
