import classNames from 'classnames/bind';
import PostItem from './PostItem';

import styles from './Posts.module.scss';

const cx = classNames.bind(styles);

const Posts = ({ timelinePosts }) => {
    return (
        <div className={cx('posts')}>
            {timelinePosts.length === 0 ? (
                <div>Không có bài viết nào</div>
            ) : (
                timelinePosts.map((post) => {
                    return <PostItem key={post._id} post={post} />;
                })
            )}
        </div>
    );
};

export default Posts;
