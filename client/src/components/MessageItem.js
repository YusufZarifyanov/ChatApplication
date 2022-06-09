import defaultImage from "../images/user.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import { useAuth } from "../hooks/auth.hook";

const MessageItem = ({ message }) => {
    const { text, name, image } = message;

    const { setChatInfo } = useContext(GeneralContext);

    const { userId } = useAuth();

    const navigate = useNavigate();

    const handleClick = () => {
        const { friendId, name } = message;

        setChatInfo({
            userId,
            friendId,
            name,
            image
        });

        navigate("/chat");
    };

    return (
        <div className="messages_item" onClick={handleClick}>
            <div className="messages_item__img">
                <img
                    className="profile_image"
                    src={
                        image
                            ? `${process.env.REACT_APP_SERVER_URL}/${image}`
                            : defaultImage
                    }
                />
            </div>

            <div className="messages_item__text">
                <h2>{name}</h2>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default MessageItem;
