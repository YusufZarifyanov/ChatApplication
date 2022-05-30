import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./routes";
import "./App.scss";

const App = () => {
    const { token, login, logout, userId } = useAuth();
    const isAuth = !!token;

    const routes = useRoutes(isAuth);

    return (
        <AuthContext.Provider
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
        </AuthContext.Provider>
    );
};

export default App;
