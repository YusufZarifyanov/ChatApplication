import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const register = () => {
        console.log(2)
    }

    return (
        <div className="inputWindow">
            <h1>Присоединяемся к безопасному общению</h1>
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
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={register}>Регитсрация</button>
        </div>
    );
};

export default Register;
