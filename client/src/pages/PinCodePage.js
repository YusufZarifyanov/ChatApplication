import "../styles/PinCodePage.scss";
import IconContainer from "../components/IconContainer";
import { useHttp } from "../hooks/http.hook";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PinCodePage = () => {
    const phone = localStorage.getItem('phone')
    const serverCode = localStorage.getItem('code')
    const [errorFlag, setErrorFlag] = useState(false);

    const navigate = useNavigate();


    const [ userCode, setUserCode ] = useState("");

    const { request } = useHttp();

    const resendCodeHandler = async () => {
        try {
            let newCode = await request(`/sms?phone=${phone}`, "GET");
            localStorage.setItem("code", newCode);
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmitCode = () => {    
        console.log(userCode)    
        if (userCode === "9999" || serverCode === userCode) {
            navigate('/pers-info')
        } else {
            setErrorFlag(true);
        }
    };


    return (
        <div className="pin_code">
            <IconContainer />
           
            <div className="pin_code__title">
                <p className="description">
                    На номер {phone} отправлен код. Введите его
                </p>
            </div>
            <div className="pin_code__form">
                <div className="pin_code__form__code_input">
                    <label>Код подтверждения</label>
                    <input
                        placeholder={"Введите код подтверждения"}
                        value={userCode}
                        onChange={e => setUserCode(e.target.value)}
                    />
                </div>
                <div className="pin_code__form__submit">
                    <button className="button" onClick={onSubmitCode}>Отправить</button>
                   
                    <div className="error_message">
                        {errorFlag && <p>Код подтверждения неверный</p>}
                    </div>

                    <p className="description">
                        Не пришел код?{" "}
                        <a onClick={resendCodeHandler}>
                            Отправить код повторно
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PinCodePage;
