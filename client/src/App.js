import { BrowserRouter as Router } from "react-router-dom";
import React, { useState } from "react";
import Modal from "./components/Modal";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./routes";
import "./App.scss";
import Navbar from "./components/Navbar";

const App = () => {
    const { token, login, logout, userId } = useAuth();
    const isAuth = !!token;
    const [modal, setModal] = useState({
        active: false,
        content: "",
    });

    const routes = useRoutes(isAuth);

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                isAuth,
                setModal
            }}
        >
            <Router>
                {isAuth && <Navbar />}
                <div className="App">
                    {routes}
                    <Modal
                        active={modal.active}
                        setActive={setModal}
                        content={modal.content}
                    />
                </div>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
