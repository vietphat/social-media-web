import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AccountItem from '~/components/AccountItem';
import routes from '~/config/routes';
import styles from './Suggestions.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

const Suggestions = ({ classes }) => {
    const user = useSelector((state) => state.user);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggesstions = async () => {
            const res = await axios.get('http://localhost:8800/api/users/get/random-users', {
                headers: {
                    Authorization: 'Bearer ' + user.jwt,
                },
            });

            if (res.status === 200) {
                setSuggestions(res.data.data);
            }
        };

        fetchSuggesstions();
    }, [user]);

    return (
        <div className={cx('wrapper', { classes })}>
            <div className={cx('card')}>
                <Link to={routes.profile.replace('userId', user.currentUser._id)}>
                    <img src={user.currentUser.avatarUrl} alt="avatar" />
                    <p>{user.currentUser.username}</p>
                </Link>
            </div>

            <div className={cx('friend-requests-container')}>
                <p>Gợi ý cho bạn</p>

                <div className={cx('friend-requests')}>
                    {suggestions.length > 0 &&
                        suggestions.map((suggestion) => <AccountItem key={suggestion._id} {...suggestion} />)}
                </div>
            </div>

            <p className={cx('footer')}>© 2022 INSTAGRAM FROM META</p>
        </div>
    );
};

export default Suggestions;
