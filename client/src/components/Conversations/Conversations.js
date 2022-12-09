import axios from 'axios';
import { useEffect, useState } from 'react';
import './Conversations.css';

export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => {
            return m !== currentUser._id;
        });

        const getUser = async () => {
            try {
                const res = await axios('http://localhost:8800/api/users/' + friendId);
                setUser(res.data.data.user);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return user ? (
        <div className="conversation">
            <img className="conversationImg" src={user.avatarUrl} alt="avatar" />
            <span className="conversationName">{user?.username}</span>
        </div>
    ) : (
        <div>...</div>
    );
}
