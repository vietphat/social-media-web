import classNames from 'classnames/bind';

import styles from './Suggestions.module.scss';

const cx = classNames.bind(styles);

const Suggestions = ({ classes }) => {
    return <div className={cx('wrapper', { classes })}>Suggestions</div>;
};

export default Suggestions;
