import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "./hooks/auth.hook";
import { GeneralContext } from "./context/GeneralContext";
import { useRoutes } from "./routes";
import "./App.scss";
import { io } from "socket.io-client";

const App = () => {
    const [socket, setSocket] = useState(null);
    const [chatInfo, setChatInfo] = useState(null);
    const { token, login, logout, userId } = useAuth();
    const isAuth = !!token;

    const routes = useRoutes(isAuth);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData?.token) {
            console.log(userData.token);
            const socket = io(process.env.REACT_APP_SERVER_URL, {
                extraHeaders: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            setSocket(socket);
        }
    }, [token]);

    return (
        <GeneralContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                socket,
                chatInfo,
                setChatInfo
            }}
        >
            <Router>
                <div className="App">{routes}</div>
            </Router>
        </GeneralContext.Provider>
    );
};

export default App;
