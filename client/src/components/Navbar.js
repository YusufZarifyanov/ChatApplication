import { BsFillPersonPlusFill, BsFillChatFill } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Navbar.scss";
import { useState } from "react";

const CHAT = "chat";
const SETTINGS = "settings";
const FRIENDS = "friends";

const Navbar = () => {
    const [active, setActive] = useState(CHAT);
    const navigate = useNavigate();

    const handleNavigate = async (path, type) => {
        await setActive(type);
        navigate(path);
    };
    console.log(active);
    return (
        <div className="navbar">
            <NavLink to="/friends" activeClassName="active" className="navbar__item">
                <BsFillPersonPlusFill className="navbar__icon" />
            </NavLink>

            <NavLink to="/chat" activeClassName="active" className="navbar__item">
                <BsFillChatFill className="navbar__icon" />
            </NavLink>

            <NavLink to="/settings" activeClassName="active" className="navbar__item">
                <AiOutlineSetting className="navbar__icon" />
            </NavLink>
        </div>
    );
};

export default Navbar;
