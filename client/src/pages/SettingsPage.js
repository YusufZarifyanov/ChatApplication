import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GeneralContext } from "../context/GeneralContext";
import "../styles/SettingsPage.scss";

const SettingsPage = () => {
    const {logout} = useContext(GeneralContext)
    const navigate = useNavigate()


    return (
        <div className="settings container">
            <div className="container__header">
                <p>Настройки</p>
            </div>
            <div className="settings__list">
                <div>
                    <button onClick={() => navigate("/settings/pers-info")}>Изменить личные данные</button>
                </div>
                <div>
                    <button>Черный список</button>
                </div>
                <div>
                    <button onClick={logout}>Выйти</button>
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default SettingsPage;
