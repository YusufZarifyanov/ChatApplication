import { useContext, useEffect, useState } from "react";
import "../styles/Register.scss";
import { useHttp } from "../hooks/http.hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const auth = useContext(AuthContext)


    const { error, request } = useHttp(auth.setModal);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(error);
    }, [error]);

    const registerHandler = async () => {
        try {
            const data = await request("/auth/register", "POST", {
                name,
                password,
                email,
            });
            if (data.status) {
                navigate("/login");
            } else {
                console.log("dalse1");
            }
        } catch (err) {
            console.log("dalse2");
        }
    };

    return (
        <div className="register">
            <h1>Присоединяемся к безопасному общению</h1>

            <div className="register__inputs">
                <input
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Введите email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button onClick={registerHandler}>Регистрация</button>
        </div>
    );
};

export default Register;
