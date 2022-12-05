import React from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

const Input = ({ placeholder, name, id, type = 'text', classNames }) => {
    return <input className={cx('input', classNames)} placeholder={placeholder} name={name} id={id} type={type} />;
};

export default Input;
