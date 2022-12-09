import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import routes from '~/config/routes';
import styles from './Conversation.module.scss';

const cx = classNames.bind(styles);

const Conversation = ({ conversation, jwt, currentUserId, onClick }) => {
    const friend = conversation.members.find((member) => member._id !== currentUserId);

    return (
        <NavLink
            onClick={(e) => onClick(friend)}
            to={routes.inbox.replace(':conversationId', conversation._id)}
            className={(nav) => cx('conversation', { active: nav.isActive })}
        >
            <img src={friend.avatarUrl} alt="avatar" />
            <h5>{friend.username}</h5>
        </NavLink>
    );
};

export default Conversation;
