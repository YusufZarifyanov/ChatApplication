import IconContainer from "../components/IconContainer";
import { useForm } from "react-hook-form";
import { GeneralContext } from "../context/GeneralContext";
import { useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import validator from "validator";

import "../styles/LoginPage.scss";

const LoginPage = () => {
    const { login } = useContext(GeneralContext);

    const { request, serverError } = useHttp();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async ({ phone, password }) => {
        try {
            const response = await request("/auth/login", "POST", {
                phone,
                password,
            });
            login(response.token, response.userId);
        } catch (err) {
            console.log(err);
        }
        reset();
    };

    return (
        <div className="login">
            <IconContainer />
            <div className="login__title">
                <p className="title">Вход в аккаунт</p>
            </div>

            <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="login__form__input_container">
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

                <div className="login__form__input_container">
                    <label>Пароль</label>
                    <input
                        type={"password"}
                        placeholder={"Введите пароль"}
                        {...register("password", {
                            required: "Поле обязательно к заполнению",
                            minLength: {
                                value: 6,
                                message: "Минимальная длинна пароля 6 символов",
                            },
                        })}
                    />
                    <div className="error_message">
                        {errors?.password && (
                            <p>
                                {errors?.password?.message ||
                                    "Некорректный пароль"}
                            </p>
                        )}
                    </div>
                </div>

                <div className="login__form__submit">
                    <input
                        type="submit"
                        value="Отправить"
                        className="input__submit"
                        disabled={!isValid}
                    />

                    <div className="error_message">
                        {serverError && <p>{serverError}</p>}
                    </div>

                    <p>
                        Нет аккаунта? <a href="/register">Регистрация</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
