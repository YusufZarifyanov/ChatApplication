import { useState } from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPaswword] = useState("");

    const navigate = useNavigate();

    const login = () => {
        console.log(1);
    };

    return (
        <div className="inputWindow">
            <h1>Title</h1>
            <input
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPaswword(e.target.value)}
            />

            <div className="inputWindow__buttons">
                <div className="inputWindow__buttons__login">
                    <button onClick={login}>Войти</button>
                    <button onClick={() => navigate("/register")}>
                        Регистрация
                    </button>
                </div>
                <div className="inputWindow__buttons__forgotPaswword">
                    <button>Забыли пароль?</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
