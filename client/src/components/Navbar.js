import { BsFillPersonPlusFill, BsFillChatFill } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Navbar.scss";
import { useState } from "react";


const Navbar = () => {
    const [active, setActive] = useState("chat");
    const navigate = useNavigate();

    const handleNavigate = async (path, type) => {
        await setActive(type);
        navigate(path);
    };

    return (
        <div className="navbar">
            <NavLink to="/friends" activeclassname="active" className="navbar__item">
                <BsFillPersonPlusFill className="navbar__icon" />
            </NavLink>

            <NavLink to="/messages" activeclassname="active" className="navbar__item">
                <BsFillChatFill className="navbar__icon" />
            </NavLink>

            <NavLink to="/settings" activeclassname="active" className="navbar__item">
                <AiOutlineSetting className="navbar__icon" />
            </NavLink>
        </div>
    );
};

export default Navbar;
