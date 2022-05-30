import React, { useRef } from "react";
import IconContainer from "../components/IconContainer";
import { useForm } from "react-hook-form";
import "../styles/PersInfoPage.scss";
import validator from "validator";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const PersInfoPage = () => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
        watch,
    } = useForm({
        mode: "onBlur",
    });

    const phone = '+7' + localStorage.getItem('phone')

    const { request } = useHttp();

    const { login } = useContext(AuthContext);

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async ({ name, email, password }) => {
        
        try {
            const register = await request("/auth/register", "POST", {
                phone,
                name,
                password,
                email,
            });
            if (register.id) {
                const logIn = await request("/auth/login", "POST", {
                    phone: register.phone,
                    password,
                });
                login(logIn.token, logIn.userId);
            } else {
                console.log(register);
            }
            reset();
        } catch (err) {
            console.log("dalse2");
        }
    };

    return (
        <div className="pers_info">
            <IconContainer />

            <div className="pers_info__title">
                <p className="title">Расскажите о себе</p>
            </div>

            <form className="pers_info__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="pers_info__form__item">
                    <label>Имя</label>
                    <input
                        placeholder={"Введите имя"}
                        {...register("name", {
                            required: "Поле обязательно к заполнению",
                            validate: (name) =>
                                validator.isAlpha(name, ["ru-RU"]),
                        })}
                    />
                    <div className="error_message">
                        {errors?.name && (
                            <p>{errors?.name?.message || "Некорректное имя"}</p>
                        )}
                    </div>
                </div>

                <div className="pers_info__form__item">
                    <label>Email</label>
                    <input
                        placeholder={"Введите почту"}
                        {...register("email", {
                            required: "Поле обязательно к заполнению",
                            validate: (email) => validator.isEmail(email),
                        })}
                    />
                    <div className="error_message">
                        {errors?.email && (
                            <p>
                                {errors?.email?.message || "Некорректный email"}
                            </p>
                        )}
                    </div>
                </div>

                <div className="pers_info__form__item">
                    <label>Пароль</label>
                    <input
                        type={"password"}
                        placeholder={"Введите пароль"}
                        {...register("password", {
                            required: "Поле обязательно к заполнению",
                            minLength: {
                                value: 8,
                                message: "Минимальная длина пароля: 8",
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

                <div className="pers_info__form__item">
                    <label>Повтор пароля</label>
                    <input
                        type={"password"}
                        placeholder={"Повторите пароль"}
                        {...register("password_repeat", {
                            validate: (value) =>
                                value === password.current ||
                                "Пароли не совпадают",
                        })}
                    />
                    <div className="error_message">
                        {errors?.password_repeat && (
                            <p>
                                {errors?.password_repeat?.message ||
                                    "Пароли не совпадают"}
                            </p>
                        )}
                    </div>
                </div>
                <div className="pers_info__form__item">
                    <input
                        type="submit"
                        value="Отправить"
                        className="input__submit"
                        disabled={!isValid}
                    />
                </div>
            </form>
        </div>
    );
};

export default PersInfoPage;
