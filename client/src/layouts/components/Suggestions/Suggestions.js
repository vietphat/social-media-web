import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import AccountItem from '~/components/AccountItem';
import routes from '~/config/routes';
import styles from './Suggestions.module.scss';

const cx = classNames.bind(styles);

const friendRequestsReceived = [
    {
        _id: 1,
        username: 'Rick Grimes',
        avatarUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
    },
    {
        _id: 2,
        username: 'Carl Grimes',
        avatarUrl: 'https://luv.vn/wp-content/uploads/2021/08/hot-girl-deo-kinh-16.jpg',
    },
    {
        _id: 3,
        username: 'Daryl Dixon',
        avatarUrl: 'https://anhdephd.vn/wp-content/uploads/2022/05/anh-gai-xinh-de-thuong.jpg',
    },
];

const Suggestions = ({ classes }) => {
    return (
        <div className={cx('wrapper', { classes })}>
            <div className={cx('card')}>
                <Link to={routes.profile}>
                    <img src="/bjorn.jpg" alt="avatar" />
                    <p>__vietphat</p>
                </Link>
            </div>

            <div className={cx('friend-requests-container')}>
                <p>Lời mời kết bạn</p>

                <div className={cx('friend-requests')}>
                    {friendRequestsReceived.map((friendRequest) => (
                        <AccountItem key={friendRequest._id} {...friendRequest} />
                    ))}
                </div>
            </div>

            <p className={cx('footer')}>© 2022 INSTAGRAM FROM META</p>
        </div>
    );
};

export default Suggestions;
