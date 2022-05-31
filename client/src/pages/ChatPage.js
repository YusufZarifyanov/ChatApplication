import Navbar from "../components/Navbar";
import "../styles/ChatPage.scss";

const ChatPage = () => {
    return (
        <div className="chat">
            {/* <div className="chat__header">Чаты</div>
            <div className="chat__content">
                <p className="chat__content_without_msg"> У вас пока нет сообщений</p>
            </div> */}
            <Navbar />
        </div>
    );
};

export default ChatPage;
