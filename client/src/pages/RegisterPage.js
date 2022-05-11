import "../styles/RegisterPage.scss";
import icon from "../images/icon.png";
import Input from "../components/Input";
import Button from "../components/Button";

const RegisterPage = () => {
    return (
        <div className="container">
            <div className="container__header">
                <img width="230" src={icon} />
            </div>
            <div className="container__info">
                <div className="container__info__text">
                    <p className="title">Создайте аккаунт прямо сейчас!</p>
                    <p className="description">Введите номер телефона</p>
                </div>
                <div className="container__info__input">
                    <Input placeholder={"Введите телефон"} />
                    <Button text={"Продолжить"}/>
                    <p>
                        Уже есть аккаунт? <a>Войти</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
