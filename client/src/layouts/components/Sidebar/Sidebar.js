import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import httpRequest from '~/utils/httpRequest';
import { logout } from '~/store';
import { HomeIcon, MessagesIcon, SearchIcon, NotificationsIcon, LogoutIcon } from '~/components/Icons';
import routes from '~/config/routes';
import images from '~/assets/images';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = ({ classes }) => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();

        await httpRequest.get('/auth/signout');

        dispatch(logout());
    };

    return (
        <div className={cx('wrapper', classes)}>
            <div className={cx('container')}>
                <div className={cx('logo-container')}>
                    <Link to={routes.home}>
                        <img src={images.logo} alt="Instagram Logo" />
                    </Link>
                </div>

                <nav className={cx('menu')}>
                    <Link to={routes.home} className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <HomeIcon />
                        </span>
                        <span className={cx('title')}>{'Trang chủ'}</span>
                    </Link>

                    <button className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <SearchIcon />
                        </span>
                        <span className={cx('title')}>{'Tìm kiếm'}</span>
                    </button>

                    <Link to={routes.chatbox} className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <MessagesIcon />
                        </span>
                        <span className={cx('title')}>{'Nhắn tin'}</span>
                    </Link>

                    <button className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <NotificationsIcon />
                        </span>
                        <span className={cx('title')}>{'Thông báo'}</span>
                    </button>

                    <Link to={routes.profile.replace(':userId', user.currentUser._id)} className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <img src={user.currentUser.avatarUrl} alt="avatar" />
                        </span>
                        <span className={cx('title')}>{'Trang cá nhân'}</span>
                    </Link>

                    <button onClick={handleLogout} className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <LogoutIcon />
                        </span>
                        <span className={cx('title')}>{'Đăng xuất'}</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
