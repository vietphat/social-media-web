import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setTimelinePosts, fetchTimelinePosts } from '~/store';
import Posts from '~/components/Posts';
import UploadPost from '~/components/UploadPost';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const Home = () => {
    const user = useSelector((state) => state.user);
    const timeline = useSelector((state) => state.timeline);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTimelinePosts(user.jwt));
    }, [dispatch, user]);

    console.log(timeline.posts);

    // const posts = timeline.posts.sort((postA, postB) => {
    //     return new Date(postB.createdAt) - new Date(postA.createdAt);
    // });

    return (
        <div className={cx('wrapper')}>
            <UploadPost />
            <Posts timelinePosts={timeline.posts} />
        </div>
    );
};

export default Home;
