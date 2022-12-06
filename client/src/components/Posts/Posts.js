import classNames from 'classnames/bind';
import PostItem from './PostItem';

import styles from './Posts.module.scss';

const cx = classNames.bind(styles);

const Posts = ({ timelinePosts }) => {
    return (
        <div className={cx('posts')}>
            {timelinePosts.map((post) => {
                return <PostItem key={post._id} {...post} />;
            })}
        </div>
    );
};

export default Posts;
