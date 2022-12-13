import './ChatBox.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

import Conversations from '~/components/Conversations';
import Message from '~/components/MessageBox/MessageBox';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const user = useSelector((state) => state.user);
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                createdBy: { _id: data.sender._id, avatarUrl: data.sender.avatarUrl },
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        console.log('useEffect arrivalMessage', arrivalMessage, currentChat?.members);
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.createdBy._id) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat?.members]);

    useEffect(() => {
        console.log('effect getUser');
        socket.current.emit('addUser', user.currentUser._id);
        socket.current.on('getUsers', (users) => {
            console.log('on getUser', users);
            // setOnlineUsers(user.followings.filter((f) => users.some((u) => u.userId === f)));
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get('http://localhost:8800/api/conversations/get', {
                    headers: {
                        Authorization: 'Bearer ' + user.jwt,
                    },
                });
                setConversations(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user.jwt]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get('http://localhost:8800/api/messages/get/' + currentChat?._id, {
                    headers: {
                        Authorization: 'Bearer ' + user.jwt,
                    },
                });
                setMessages(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        currentChat?._id && getMessages();
    }, [currentChat?._id, user.jwt]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            createdBy: user.currentUser._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find((member) => member !== user.currentUser._id);
        console.log('receicerId', receiverId);

        try {
            const res = await axios.post(
                'http://localhost:8800/api/messages/create',
                {
                    conversationId: message.conversationId,
                    receiver: receiverId,
                    text: message.text,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + user.jwt,
                    },
                },
            );

            console.log('create message', res.data.data);
            if (res.status === 201) {
                socket.current.emit('sendMessage', {
                    sender: user.currentUser,
                    receiverId: receiverId,
                    text: newMessage,
                });

                setMessages([...messages, res.data.data]);
                setNewMessage('');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Tim kiếm" className="chatMenuInput" />
                        {conversations.length > 0 &&
                            conversations.map((c) => (
                                <div onClick={() => setCurrentChat(c)}>
                                    <Conversations key={c._id} conversation={c} currentUser={user.currentUser} />
                                </div>
                            ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages?.length > 0 &&
                                        messages.map((m) => {
                                            return (
                                                <div key={m._id} ref={scrollRef}>
                                                    <Message
                                                        key={m._id}
                                                        message={m}
                                                        own={m.createdBy._id === user.currentUser._id}
                                                    />
                                                </div>
                                            );
                                        })}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="Nhập tin nhắn..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Gửi
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">LET'S CHAT ONLINE.</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
