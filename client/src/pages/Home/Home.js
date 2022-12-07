import classNames from 'classnames/bind';

import Posts from '~/components/Posts';
import UploadPost from '~/components/UploadPost';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const timelinePosts = [
    {
        _id: '638cb4a6ec1f185b6a6c46b8',
        createdBy: {
            _id: '638b8bb4e03ad60223dd7089',
            username: 'Walter White',
            avatarUrl: '/bjorn.jpg',
        },
        description: 'Bla Bla bLa blA',
        mediaUrls: [
            'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
            'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
            'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
        ],
        likes: [],
        createdAt: '2022-12-04T14:54:30.144Z',
        updatedAt: '2022-12-04T14:54:30.144Z',
        __v: 0,
        comments: [
            {
                _id: '638cd0920941f81faddb8ecc',
                createdBy: {
                    _id: '638b8bb4e03ad60223dd7081',
                    username: 'Walter White',
                    avatarUrl: '/bjorn.jpg',
                },
                description: '????',
                likes: ['1', '2', '3'],
                createdAt: '2022-12-04T16:53:38.523Z',
            },
            {
                _id: '638cd0920941f81faddb8ece',
                createdBy: {
                    _id: '638b8bb4e03ad60223dd7089',
                    username: 'Walter White',
                    avatarUrl: '/bjorn.jpg',
                },
                description: 'This is a comment',
                likes: [],
                createdAt: '2022-12-04T16:53:38.523Z',
            },
            {
                _id: '638cd0920941f81faddb8e',
                createdBy: {
                    _id: '638b8bb4e03ad60dd7089',
                    username: 'Walter White',
                    avatarUrl: '/bjorn.jpg',
                },
                likes: [],
                description:
                    'This is another comment This is another commenThis is another commenThis is another commenThis is another commen',
                createdAt: '2022-12-04T16:53:38.523Z',
            },
            {
                _id: '638cd0920941f81faddb8eewe',
                createdBy: {
                    _id: '638b8bb4e03ad60dd7089',
                    username: 'Walter White',
                    avatarUrl: '/bjorn.jpg',
                },
                likes: [],
                description:
                    'This is another comment This is another commenThis is another commenThis is another commenThis is another commen',
                createdAt: '2022-12-04T16:53:38.523Z',
            },
            {
                _id: '638cd0920941f81faddb8eeqweqwqe',
                createdBy: {
                    _id: '638b8bb4e03ad60dd7089',
                    username: 'Walter White',
                    avatarUrl: '/bjorn.jpg',
                },
                likes: [],
                description:
                    'This is another comment This is another commenThis is another commenThis is another commenThis is another commen',
                createdAt: '2022-12-04T16:53:38.523Z',
            },
        ],
    },
    {
        _id: '638cb4a6ec1f185b6a6c46b9',
        createdBy: {
            _id: '638b8bb4e03ad60223dd7089',
            username: 'Walter White',
            avatarUrl: '/bjorn.jpg',
        },
        description: 'Bla Bla bLa blA',
        mediaUrls: [
            'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
            'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
            'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
        ],
        likes: [],
        createdAt: '2022-12-04T14:54:30.144Z',
        updatedAt: '2022-12-04T14:54:30.144Z',
        __v: 0,
        comments: [],
    },
    {
        _id: '638cb4a6ec1f185b6a6c46b1',
        createdBy: {
            _id: '638b8bb4e03ad60223dd7089',
            username: 'Walter White',
            avatarUrl: '/bjorn.jpg',
        },
        description: 'Bla Bla bLa blA',
        mediaUrls: [
            'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
            'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
            'https://firebasestorage.googleapis.com/v0/b/clone-a455e.appspot.com/o/videos%2F16595934011519convert.com%20-%20Fkj%20%20Masego%20%20Tadow_v720P.mp4?alt=media&token=e75915c9-c0e4-4ebd-835e-a0efb8067dea',
        ],
        likes: [],
        createdAt: '2022-12-04T14:54:30.144Z',
        updatedAt: '2022-12-04T14:54:30.144Z',
        __v: 0,
        comments: [],
    },
];

const Home = () => {
    return (
        <div className={cx('wrapper')}>
            <UploadPost />
            <Posts timelinePosts={timelinePosts} />
        </div>
    );
};

export default Home;
