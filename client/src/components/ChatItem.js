import { useAuth } from "../hooks/auth.hook";

const ChatItem = ({ message }) => {
    const { userId } = useAuth();

    return (
        <div
            className={
                userId === message.senderId
                    ? "chat__content__message message_right"
                    : "chat__content__message"
            }
        >
            <p>{message.text}</p>
        </div>
    );
};

export default ChatItem;
