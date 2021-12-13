import React, { useContext, useEffect, useState } from "react";
import "../styles/ChatPage.scss";
import { BsPersonBoundingBox, BsPlusLg } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

const Chatpage = () => {
    const [friends, setFriends] = useState([]);
    const [email, setEmail] = useState("");
    const auth = useContext(AuthContext);
    const { request } = useHttp(auth.setModal);

    useEffect(async () => {
        const data = await request(`/user/all-friends?userId=${auth.userId}`);
        setFriends(data);
    }, [friends]);

    const addFriendHandler = async () => {
        const data = await request(
            `/user/friend?userId=${auth.userId}&friendEmail=${email}`,
        );
        friends.push(data);
        console.log(friends);
    };

    return (
        <div className="chat">
            <div className="chat__left">
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
                    <div className="chat__left__item">
                        <BsPersonBoundingBox color="white" fontSize="1.5em" />
                        <p>{friend.name}</p>
                    </div>
                ))}
            </div>

            <div className="chat__right"></div>
        </div>
    );
};

export default Chatpage;
