import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/auth.hook";
import { useHttp } from "../hooks/http.hook";
import defaultImage from "../images/user.png";
import "../styles/UserInfoPage.scss"

const UserInfoPage = () => {
    const { userId } = useAuth();

    const { request } = useHttp();

    const [data, setData] = useState({});

    const hiddenFileInput = useRef(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await request(`/user/${userId}`);
                setData(response);
            } catch (err) {
                console.log("Pers info page err: ", err);
            }
        };

        getUserData();
    }, []);

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    const handleUploadImage = (e) => {
        console.log(e.target.files[0])
    }

    return (
        <div className="userInfo container">
            <div className="container__header">Личная информация</div>
            <div className="userInfo__image">
                <img
                    src={
                        data.image
                            ? `${process.env.REACT_APP_SERVER_URL}/${data.image}`
                            : defaultImage
                    }
                />
                
                <button onClick={handleClick}>Загрузить изображение</button>
                <input 
                    ref={hiddenFileInput}
                    style={{"display": "none"}}
                    placeholder="Загрузите изображение"
                    type={"file"}
                    onChange={handleUploadImage}
                />
            </div>
            <Navbar />
        </div>
    );
};

export default UserInfoPage;
