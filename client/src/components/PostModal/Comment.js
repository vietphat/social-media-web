import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import routes from '~/config/routes';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';

import { NotificationsIcon } from '../Icons';
import styles from './PostModal.module.scss';
import { likeComment, unlikeComment } from '~/store';

const cx = classNames.bind(styles);

const Comment = ({ comment }) => {
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.timeline.posts);
    const [commentWasLiked, setCommentWasLiked] = useState(
        comment.likes.findIndex((like) => like._id === user.currentUser._id) !== -1,
    );

    const dispatch = useDispatch();

    const handleLikeComment = async (commentId, postId) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };
        // kiểm tra người dùng hiện tại đã thích comment đó chưa
        const postIndex = posts.findIndex((post) => post._id === postId);

        const commentIndex = posts[postIndex].comments.findIndex((comment) => comment._id === commentId);
        const likeIndex = posts[postIndex].comments[commentIndex].likes.findIndex(
            (like) => like._id === user.currentUser._id,
        );

        // chưa thích comment -> gọi api thích comment
        if (likeIndex === -1) {
            try {
                const res = await axios.patch(`http://localhost:8800/api/comments/like/${commentId}`, {}, config);

                if (res.status === 200) {
                    // update posts -> comments
                    // res.data.data = comment => replace comment trong posts
                    setCommentWasLiked(true);
                    dispatch(
                        likeComment({
                            comment: res.data.data,
                            postIndex,
                            commentIndex,
                        }),
                    );
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            // gọi api bỏ thích comment
            try {
                const res = await axios.patch(`http://localhost:8800/api/comments/unlike/${commentId}`, {}, config);

                if (res.status === 200) {
                    // update posts -> comments
                    // res.data.data = comment => replace comment trong posts
                    setCommentWasLiked(false);
                    dispatch(
                        unlikeComment({
                            likeIndex,
                            postIndex,
                            commentIndex,
                            userId: user.currentUser.id,
                        }),
                    );
                }
            } catch (error) {}
        }
    };

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
                    <span>{format(comment.createdAt)}</span>
                    {/* <span>{comment.createdAt}</span> */}
                    <h6>{comment.likes.length} người thích</h6>
                </div>
            </div>

            <div onClick={() => handleLikeComment(comment._id, comment.postId)} className={cx('like-comment')}>
                <NotificationsIcon className={cx({ liked: commentWasLiked })} width="1.6rem" height="1.6rem" />
            </div>
        </div>
    );
};

export default Comment;
