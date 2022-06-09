import { useContext, useEffect, useState } from "react";
import { BsArrowLeftCircle, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ChatItem from "../components/ChatItem";
import { GeneralContext } from "../context/GeneralContext";
import { useHttp } from "../hooks/http.hook";
import defaultImage from "../images/user.png";
import "../styles/ChatPage.scss";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    const { chatInfo, socket } = useContext(GeneralContext);

    const navigate = useNavigate();

    const { request } = useHttp();

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await request(
                    `/message?friendId=${chatInfo.friendId}`,
                );

                setMessages(response);
            } catch (err) {
                console.log("Chat err: ", err);
            }
        };

        getMessages();
    }, []);

    useEffect(() => {
        socket.on("chat", (data) => {
            setMessages(data);
        });
    }, [socket]);

    const handleSubmitMessage = async () => {
        if (text !== "") {
            socket.emit("chat", {
                text,
                senderId: chatInfo.userId,
                receivedId: chatInfo.friendId,
            });
            setText("");
        }
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__header__back_icon">
                    <BsArrowLeftCircle
                        style={{ fontSize: "3em" }}
                        onClick={() => navigate("/messages")}
                    />
                </div>
                <p className="title">{chatInfo.name}</p>
                <div className="chat__header__image">
                    <img
                        className="profile_image"
                        src={
                            chatInfo.image
                                ? `${process.env.REACT_APP_SERVER_URL}/${chatInfo.image}`
                                : defaultImage
                        }
                    />
                </div>
            </div>

            <div className="chat__content">
                {messages.map((message, index) => (
                    <ChatItem key={index} message={message} />
                ))}
            </div>

            <div className="chat__input">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введите сообщение"
                />
                <BsFillArrowRightCircleFill
                    style={{ fontSize: "2.5em" }}
                    onClick={handleSubmitMessage}
                />
            </div>
        </div>
    );
};

export default ChatPage;
