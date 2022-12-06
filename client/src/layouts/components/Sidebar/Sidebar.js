import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { HomeIcon, MessagesIcon, SearchIcon, NotificationsIcon, LogoutIcon } from '~/components/Icons';
import routes from '~/config/routes';
import images from '~/assets/images';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = ({ classes }) => {
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

                    <Link to={routes.inbox} className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <MessagesIcon />
                        </span>
                        <span className={cx('title')}>{'Tin nhắn'}</span>
                    </Link>

                    <button className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <NotificationsIcon />
                        </span>
                        <span className={cx('title')}>{'Thông báo'}</span>
                    </button>

                    <Link to={routes.profile} className={cx('menu-item')}>
                        <span className={cx('icon')}>
                            <img src="./bjorn.jpg" alt="Bjorn Ironside" />
                        </span>
                        <span className={cx('title')}>{'Trang cá nhân'}</span>
                    </Link>

                    <button className={cx('menu-item')}>
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
