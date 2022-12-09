import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import routes from '~/config/routes';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

const AccountItem = ({ username, avatarUrl, receivedDate, _id }) => {
    return (
        <div className={cx('wrapper')}>
            <Link to={routes.profile.replace(':userId', _id)} className={cx('avatar')}>
                <img src={avatarUrl} alt="avatar" />
            </Link>

            <div className={cx('info-container')}>
                <Link to={routes.profile.replace(':userId', _id)} className={cx('info')}>
                    <h5>{username}</h5>
                    <h6>3 hours ago</h6>
                </Link>

                <div className={cx('actions')}>
                    <button className={cx('accept-btn')}>Theo dõi</button>
                </div>
            </div>
        </div>
    );
};

export default AccountItem;
