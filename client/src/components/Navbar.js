import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.scss";

const Navbar = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const logoutHadler = (event) => {
        event.preventDefault();
        auth.logout();
        navigate("/login");
    };

    return (
        <ul>
            <li>
                <a href="/chat">Чаты</a>
            </li>
            <li>
                <a href="/profile">Комнаты</a>
            </li>
            <li style={{float: "right"}}>
                <a href="/" onClick={logoutHadler}>
                    Выйти
                </a>
            </li>
        </ul>
    );
};

export default Navbar;
