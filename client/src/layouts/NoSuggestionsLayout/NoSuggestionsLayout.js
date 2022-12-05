import classNames from 'classnames/bind';

import Sidebar from './../components/Sidebar';
import styles from './NoSuggestionsLayout.module.scss';

const cx = classNames.bind(styles);

const NoSuggestionsLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar classes={cx('sidebar')} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default NoSuggestionsLayout;
