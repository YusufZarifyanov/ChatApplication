import { useEffect, useState } from "react";
import MessageItem from "../components/MessageItem";
import Navbar from "../components/Navbar";
import { useHttp } from "../hooks/http.hook";
import "../styles/MessageListPage.scss";

const MessageListPage = () => {
    const [messages, setMessages] = useState([]);

    const { request } = useHttp();

    useEffect(() => {
        const getChatList = async () => {
            try {
                const response = await request("/message/chat-list", "GET");
                setMessages(response);
            } catch (err) {
                console.log("Chat error: ", err);
            }
        };
        getChatList();
    }, []);
   

    return (
        <div className="messages container">
            <div className="container__header">
                <p className="title">Чаты</p>
            </div>
            <div className="messages__content">
                {messages.length === 0 ? (
                    <p className="messages__content_without_msg">
                        У вас пока нет сообщений
                    </p>
                ) : (
                    messages.map((message, index) => (
                        <MessageItem key={index} message={message} />
                    ))
                )}
            </div>
            <Navbar />
        </div>
    );
};

export default MessageListPage;
