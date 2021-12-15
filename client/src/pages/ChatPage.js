import React, { useContext, useEffect, useState } from "react";
import "../styles/ChatPage.scss";
import {
    BsPersonBoundingBox,
    BsPlusLg,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:4000";

const socket = io(SERVER_URL, { transports: ["websocket"] });

const Chatpage = () => {
    const [friends, setFriends] = useState([]);
    const [addFriend, setAddFriend] = useState(1);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [activeIdFriend, setActiveIdFriend] = useState(null);

    const auth = useContext(AuthContext);
    const { request } = useHttp(auth.setModal);

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
        setMessage("")
        activeIdFriend &&
            socket.emit("getAllMessages", {
                userId: auth.userId,
                senderId: activeIdFriend,
            });
    }, [activeIdFriend]);

    useEffect(() => {
        fetchFriend();
    }, [addFriend]);

    useEffect(() => {
        socket.on("allMessages", (data) => {
            setMessages(data);
        });
    }, [socket]);

    const addFriendHandler = async () => {
        const data = await request(
            `/user/friend?userId=${auth.userId}&friendEmail=${email}`,
        );
        if (data.statusCode !== 404) {
            friends.push(data);
            setAddFriend("");
        }
    };

    const sendMessageHadler = async () => {
        activeIdFriend &&
            socket.emit("sendMessage", {
                text: message,
                senderId: auth.userId,
                receivedId: activeIdFriend,
            });
        setMessage("");
    };

    const sendActiveFriendHandler = (id) => {
        setActiveIdFriend(id);
    };

    console.log(activeIdFriend, messages);

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
                {friends.map((friend) => {
                    const activeStyle =
                        friend.id === activeIdFriend ? " active" : "";
                    return (
                        <div
                            className={"chat__left__item" + activeStyle}
                            key={friend.id}
                            onClick={() => sendActiveFriendHandler(friend.id)}
                        >
                            <BsPersonBoundingBox
                                color="white"
                                fontSize="1.5em"
                            />
                            <p>{friend.name}</p>
                        </div>
                    );
                })}
            </div>

            <div className="chat__right">
                <div className="chat__right__messages">
                    {messages.map((curMessage) => {
                        if (auth.userId !== curMessage.senderId) {
                            return (
                                <div className="chat__right__messages__message">
                                    <p>{curMessage.text}</p>
                                    <span>Yusuf</span>
                                </div>
                            );
                        } else {
                            return (
                                <div className="chat__right__messages__message mess-right">
                                    <p>{curMessage.text} </p>
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
