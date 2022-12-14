import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Message.module.scss';
import routes from '~/config/routes';
import { format } from 'timeago.js';

const cx = classNames.bind(styles);

const Message = ({ message, own }) => {
    return (
        <div className={cx('wrapper', { own })}>
            <div className={cx('message')}>
                <Link to={routes.profile.replace(':userId', message.receiver._id)}>
                    <img src={message.receiver.avatarUrl} alt="avatar" />
                </Link>
                <div>{message.text}</div>
            </div>
            <div className={cx('date')}>{format(message.createdAt)}</div>
        </div>
    );
};

export default Message;
