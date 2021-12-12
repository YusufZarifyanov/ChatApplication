import React from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext);

    const logoutHadler = event => {
        event.preventDefault();
        auth.logout();
        navigate('/login')
    };

    return (
        <nav>
            <div class="nav-wrapper">
                <a href="/" class="brand-logo">
                    Enigma
                </a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/profile">Профиль</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Комнаты</NavLink>
                    </li>
                    <li>
                        <a href="/" onClick={logoutHadler}>
                            Выйти
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
