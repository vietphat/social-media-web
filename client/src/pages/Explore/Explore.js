import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { PostsIcon } from '~/components/Icons';
import UserPostItem from '../Profile/UserPostItem';
import styles from './Explore.module.scss';
import { setTimelinePosts } from '~/store';

const cx = classNames.bind(styles);

const Explore = () => {
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.timeline.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllPosts = async () => {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.jwt,
                },
            };

            try {
                const res = await axios('http://localhost:8800/api/posts/get-all-posts', config);

                if (res.status === 200) {
                    dispatch(setTimelinePosts(res.data.data));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllPosts();
    }, [user.jwt, dispatch]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('posts')}>
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

export default Explore;
