import React, { useContext, useEffect, useState } from "react";
import "../styles/ChatPage.scss";
import {
    BsPersonBoundingBox,
    BsPlusLg,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:4000'


const Chatpage = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket =io(SERVER_URL, {transports: ['websocket']});
        setSocket(newSocket);
      }, [setSocket]);

    const [friends, setFriends] = useState([]);

    const [addFriend, setAddFriend] = useState(1);

    const [email, setEmail] = useState("");
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const auth = useContext(AuthContext);
    const { request } = useHttp(auth.setModal);

    const messages = [
        { text: "Hello", senderId: 1 },
        { text: "Hello1", senderId: 41 },
        { text: "Hello2", senderId: 1 },
    ];

    const fetchProfile = async () => {
        const data = await request(`/user?userId=${auth.userId}`);
        setUser(data);
    };

    const fetchFriend = async () => {
        const data = await request(`/user/all-friends?userId=${auth.userId}`);
        setFriends(data);
    };

    useEffect(() => {
        fetchProfile();
        fetchFriend();
    }, []);

    useEffect(() => {
        fetchFriend();
    }, [addFriend])

    const addFriendHandler = async () => {
        const data = await request(
            `/user/friend?userId=${auth.userId}&friendEmail=${email}`,
        );
        if (data.statusCode !== 404) {
            friends.push(data);
            setAddFriend('');
        }
    };

    const sendMessageHadler = async () => {
        socket.emit('testMessage')
    };

    return (
        <div className="chat">
            <div className="chat__left">
                <div className="chat__left__item profile">
                    <BsPersonBoundingBox color="white" fontSize="1.5em" />
                    <h4>{user.name}</h4>
                </div>
                <div className="chat__left__item add">
                    <BsPlusLg color="white" fontSize="1.5em" />
                    <div className="add__find">
                        <input
                            placeholder="Введите email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={addFriendHandler}>
                            Найти человека
                        </button>
                    </div>
                </div>
                {friends.map((friend) => (
                    <div className="chat__left__item" key={friend.id}>
                        <BsPersonBoundingBox
                            color="white"
                            fontSize="1.5em"
                            key={friend.id}
                        />
                        <p key={friend.id}>{friend.name}</p>
                    </div>
                ))}
            </div>

            <div className="chat__right">
                <div className="chat__right__messages">
                    {messages.map((message) => {
                        if (auth.userId === message.senderId) {
                            return (
                                <div className="chat__right__messages__message">
                                    <p>{message.text}</p>
                                    <span>Yusuf</span>
                                </div>
                            );
                        } else {
                            return (
                                <div className="chat__right__messages__message mess-right">
                                    <p>{message.text} </p>
                                    <span>Yusuf</span>
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="chat__right__inputMsg">
                    <input
                        placeholder="Введите новое сообщение"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessageHadler}>
                        {" "}
                        <BsFillArrowRightCircleFill
                            color="white"
                            fontSize="1.5em"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatpage;
