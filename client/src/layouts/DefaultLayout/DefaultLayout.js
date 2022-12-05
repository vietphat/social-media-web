import classNames from 'classnames';

import Sidebar from './../components/Sidebar';
import Suggestions from './../components/Suggestions';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
                <Suggestions />
            </div>
        </div>
    );
};

export default DefaultLayout;
