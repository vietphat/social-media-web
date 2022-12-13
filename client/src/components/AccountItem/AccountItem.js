import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { follow } from '~/store';
import routes from '~/config/routes';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

const AccountItem = ({ username, avatarUrl, receivedDate, _id }) => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleFollowAUser = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        };
        try {
            const res = await axios.patch(`http://localhost:8800/api/users/follow/${_id}`, {}, config);

            if (res.status === 200) {
                console.log('Theo dõi người dùng thành công');
                dispatch(follow(res.data.data.following));
                navigate(routes.profile.replace(':userId', _id));
            }
        } catch (error) {
            console.log('có lỗi', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Link to={routes.profile.replace(':userId', _id)} className={cx('avatar')}>
                <img src={avatarUrl} alt="avatar" />
            </Link>

            <div className={cx('info-container')}>
                <Link to={routes.profile.replace(':userId', _id)} className={cx('info')}>
                    <h5>{username}</h5>
                    {/* <h6>3 hours ago</h6> */}
                </Link>

                <div className={cx('actions')}>
                    <button onClick={handleFollowAUser} className={cx('accept-btn')}>
                        Theo dõi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountItem;
