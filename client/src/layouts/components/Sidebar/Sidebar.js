import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import axios from 'axios';

import useDebounce from '~/hooks/useDebounce';
import httpRequest from '~/utils/httpRequest';
import { logout } from '~/store';
import { HomeIcon, MessagesIcon, SearchIcon, NotificationsIcon, LogoutIcon } from '~/components/Icons';
import routes from '~/config/routes';
import images from '~/assets/images';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = ({ classes }) => {
    const user = useSelector((state) => state.user);
    const [searchShown, setSearchShown] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchInputRef = useRef();

    const dispatch = useDispatch();

    const debouncedValue = useDebounce(searchInput, 500);

    const handleLogout = async (e) => {
        e.preventDefault();

        await httpRequest.get('/auth/signout');

        dispatch(logout());
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value.trimStart());
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResults([]);
            return;
        }

        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:8800/api/users/search/${debouncedValue}`);

                if (res.status === 200) {
                    setSearchResults(res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        fetchUser();
    }, [debouncedValue]);

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

                    <button onClick={() => setSearchShown((prev) => !prev)} className={cx('menu-item')}>
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
                    {searchShown && (
                        <section className={cx('search-section')}>
                            <header className={cx('header')}>
                                <h4>Tìm kiếm</h4>

                                <div className={cx('search-input')}>
                                    <input
                                        ref={searchInputRef}
                                        onChange={handleSearchInputChange}
                                        value={searchInput}
                                        type="text"
                                        placeholder="Nhập tên người dùng"
                                    />
                                    <FontAwesomeIcon onClick={() => setSearchInput('')} icon={faClose} />
                                </div>
                            </header>

                            <div className={cx('search-results')}>
                                {loading ? (
                                    <div className={cx('loading')}>Đang tìm...</div>
                                ) : (
                                    searchResults.map((result) => (
                                        <Link key={result._id} to={routes.profile.replace(':userId', result._id)}>
                                            <img src={result.avatarUrl} alt="" />

                                            <div className={cx('result-item')}>
                                                <h5>{result.username}</h5>
                                                <span>{result.email}</span>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </section>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
