import "../styles/RegisterPage.scss";
import IconContainer from "../components/IconContainer";
import { useHttp } from "../hooks/http.hook";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import validator from "validator";

const RegisterPage = () => {
    const { request } = useHttp();

    const navigate = useNavigate();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        const { phone } = data;
        const serverCode = await request(`/sms?phone=${phone}`, "GET");
        localStorage.setItem("phone", phone);
        localStorage.setItem("code", serverCode);
        navigate("/pin-code");
        reset();
    };

    return (
        <div className="register">
            <IconContainer />
            <div className="register__title">
                <p className="title">Создайте аккаунт прямо сейчас!</p>
                <p className="description">
                    Для регистрации нужно ввести номер телефона
                </p>
            </div>

            <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="register__form__phone_input">
                    <label>Телефон</label>
                    <input
                        placeholder={"Введите телефон"}
                        {...register("phone", {
                            required: "Поле обязательно к заполнению",
                            validate: (phone) =>
                                validator.isMobilePhone(phone, ["ru-RU"]),
                        })}
                    />
                    <div className="error_message">
                        {errors?.phone && (
                            <p>
                                {errors?.phone?.message ||
                                    "Некорректный телефон"}
                            </p>
                        )}
                    </div>
                </div>

                <div className="register__form__submit">
                    <input
                        type="submit"
                        value="Отправить"
                        className="input__submit"
                        disabled={!isValid}
                    />

                    <p>
                        Уже есть аккаунт? <a href="/login">Войти</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
