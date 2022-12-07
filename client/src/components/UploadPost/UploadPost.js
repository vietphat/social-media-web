import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import routes from '~/config/routes';
import styles from './UploaddPost.module.scss';

const cx = classNames.bind(styles);

const UploadPost = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <Link to={routes.profile}>
                    <img src="/bjorn.jpg" alt="avatar" />
                </Link>

                <input placeholder="Bạn đang nghĩ gì?" />
            </div>
            <div className={cx('bottom')}>
                <label>
                    <input type="file" />
                    <FontAwesomeIcon icon={faImages} />
                    <span>Hình/video</span>
                </label>

                <button>Đăng</button>
            </div>
        </div>
    );
};

export default UploadPost;
