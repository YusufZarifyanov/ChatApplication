import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { useAuth } from "./hooks/auth.hook";
import { GeneralContext } from "./context/GeneralContext";
import { useRoutes } from "./routes";
import "./App.scss";

const App = () => {
    const { token, login, logout, userId } = useAuth();
    const isAuth = !!token;

    const routes = useRoutes(isAuth);

    return (
        <GeneralContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
            }}
        >
            <Router>
                <div className="App">{routes}</div>
            </Router>
        </GeneralContext.Provider>
    );
};

export default App;
