import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { PostsIcon } from '~/components/Icons';
import UserPostItem from '../Profile/UserPostItem';
import styles from './Liked.module.scss';
import { setTimelinePosts } from '~/store';

const cx = classNames.bind(styles);

const Like = () => {
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.timeline.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchLikedPosts = async () => {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.jwt,
                },
            };

            try {
                const res = await axios('http://localhost:8800/api/posts/get-liked-posts', config);

                if (res.status === 200) {
                    dispatch(setTimelinePosts(res.data.data));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchLikedPosts();
    }, [user.jwt, dispatch]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('posts')}>
                <div className={cx('posts-btn')}>
                    <PostsIcon />
                    <span>{`BÀI VIẾT ĐÃ THÍCH (${posts.length})`}</span>
                </div>

                <div className={cx('posts-list')}>
                    {posts.length > 0 ? (
                        posts.map((post) => <UserPostItem key={post._id} post={post} />)
                    ) : (
                        <h2>Không có bài viết</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Like;
