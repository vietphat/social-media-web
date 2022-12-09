import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';

import { PhoneIcon, CameraIcon, ExclamationIcon, HappyFaceIcon } from '~/components/Icons';
import routes from '~/config/routes';
import styles from './Inbox.module.scss';
import Message from '~/components/Message/Message';
import Conversation from '~/components/Conversation';

const cx = classNames.bind(styles);

const Inbox = () => {
    const user = useSelector((state) => state.user);
    const [conversations, setConversations] = useState([]);
    const [receiver, setReceiver] = useState();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const socket = useRef(io('ws://localhost:8900'));
    const scrollRef = useRef();

    const { conversationId } = useParams();

    useEffect(() => {
        socket.current.emit('addUser', user.currentUser._id);
        socket.current.on('getUser', (users) => {
            console.log(users);
        });
    }, [user]);

    useEffect(() => {
        const fetchConversations = async () => {
            const res = await axios.get(`http://localhost:8800/api/conversations/get`, {
                headers: { Authorization: 'Bearer ' + user.jwt },
            });

            if (res.status === 200) {
                setConversations(res.data.data);
            }
        };

        fetchConversations();
    }, [user.jwt]);

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await axios.get(`http://localhost:8800/api/messages/get/${conversationId}`, {
                headers: { Authorization: 'Bearer ' + user.jwt },
            });

            if (res.status === 200) {
                setMessages(res.data.data);
            }
        };
        conversationId.startsWith('6') && fetchMessages();
    }, [conversationId, user.jwt]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleOpenConversation = async (friend) => {
        console.log('friend', friend);
        setReceiver(friend);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (messageInput === '') return;

        const res = await axios.post(
            `http://localhost:8800/api/messages/create`,
            {
                conversationId,
                receiver: receiver._id,
                text: messageInput,
            },
            {
                headers: { Authorization: 'Bearer ' + user.jwt },
            },
        );

        if (res.status === 201) {
            setMessageInput('');
            setMessages((prev) => [...prev, res.data.data]);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('header')}>
                    <p>{user.currentUser.username}</p>
                </div>
                <div className={cx('conversations')}>
                    {conversations.map((conversation) => (
                        <Conversation
                            onClick={handleOpenConversation}
                            key={conversation._id}
                            currentUserId={user.currentUser._id}
                            conversation={conversation}
                            jwt={user.jwt}
                        />
                    ))}
                </div>
            </div>

            <div className={cx('right')}>
                {messages[0]?.receiver && (
                    <div className={cx('top')}>
                        <div className={cx('received-item')}>
                            <Link to={routes.profile.replace(':userId', messages[0].receiver._id)}>
                                <img src={messages[0].receiver.avatarUrl} alt="avatar" />
                                <h5>{messages[0].receiver.username}</h5>
                            </Link>
                        </div>

                        <div className={cx('actions')}>
                            <PhoneIcon />
                            <CameraIcon />
                            <ExclamationIcon />
                        </div>
                    </div>
                )}

                {messages.length > 0 ? (
                    <div className={cx('messages')}>
                        {messages.map((message) => (
                            <div key={message._id} ref={scrollRef}>
                                <Message
                                    key={message._id}
                                    message={message}
                                    own={message.createdBy === user.currentUser._id}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={cx('fallback')}>LET'S CHAT ONLINE</div>
                )}

                <div className={cx('message-box')}>
                    <div className={cx('message-input')}>
                        <div className={cx('choose-emoji-btn')}>
                            <HappyFaceIcon />
                        </div>
                        <div className={cx('enter')}>
                            <input
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                type="text"
                                placeholder="Tin nhắn..."
                            />
                            <button onClick={handleSendMessage}>Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inbox;
