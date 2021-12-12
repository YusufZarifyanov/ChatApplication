import { useContext, useState } from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = useContext(AuthContext);

    const { loading, error, request, clearError } = useHttp(auth.setModal);

    const navigate = useNavigate();

    const loginHandler = async () => {
        try {
            const data = await request("/auth/login", "POST", {
                email,
                password,
            });
            auth.login(data.token, data.userId)
        } catch (err) {
            console.log(err);
        }
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
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="inputWindow__buttons">
                <div className="inputWindow__buttons__login">
                    <button onClick={loginHandler}>Войти</button>
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
