import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import { PhoneIcon, CameraIcon, ExclamationIcon, HappyFaceIcon } from '~/components/Icons';
import routes from '~/config/routes';
import styles from './Inbox.module.scss';

const cx = classNames.bind(styles);

const friends = [
    {
        _id: 1,
        username: 'Alexander Ludwig',
        avatarUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
    },
    {
        _id: 2,
        username: 'Alexander Ludwig',
        avatarUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
    },
    {
        _id: 3,
        username: 'Alexander Ludwig',
        avatarUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
    },
    {
        _id: 4,
        username: 'Alexander Ludwig',
        avatarUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
    },
    {
        _id: 5,
        username: 'Alexander Ludwig',
        avatarUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
    },
    {
        _id: 6,
        username: 'Alexander Ludwig',
        avatarUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
    },
    {
        _id: 7,
        username: 'Alexander Ludwig',
        avatarUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
    },
    {
        _id: 8,
        username: 'Alexander Ludwig',
        avatarUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
    },
    {
        _id: 9,
        username: 'Alexander Ludwig',
        avatarUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg',
    },
];

const Inbox = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('header')}>
                    <p>__vietphat</p>
                </div>
                <div className={cx('friends')}>
                    {friends.map((friend) => (
                        <NavLink
                            to={routes.inboxWith.replace(':userId', friend._id)}
                            key={friend._id}
                            className={(nav) => cx('friend-item', { active: nav.isActive })}
                        >
                            <img src={friend.avatarUrl} alt="avatar" />
                            <h5>{friend.username}</h5>
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className={cx('right')}>
                <div className={cx('top')}>
                    <div className={cx('received-item')}>
                        <Link to={routes.profile.replace(':userId', 'someid')}>
                            <img
                                src="https://icdn.dantri.com.vn/thumb_w/640/2021/03/14/hot-girl-9-x-dep-goi-camdocx-1615737535134.jpeg"
                                alt="avatar"
                            />
                            <h5>Alexander Ludwig</h5>
                        </Link>
                    </div>

                    <div className={cx('actions')}>
                        <PhoneIcon />
                        <CameraIcon />
                        <ExclamationIcon />
                    </div>
                </div>

                <div className={cx('message-box')}>
                    <div className={cx('message-input')}>
                        <div className={cx('choose-emoji-btn')}>
                            <HappyFaceIcon />
                        </div>
                        <div className={cx('enter')}>
                            <input type="text" placeholder="Tin nhắn..." />
                            <button>Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inbox;
