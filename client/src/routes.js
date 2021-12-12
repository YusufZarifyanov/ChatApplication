import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chatpage from "./pages/ChatPage";
import Homepage from "./pages/HomePage";
import Register from "./components/Register";

export const useRoutes = (isAuthenticated, setModal) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/chat" exact element={<Chatpage />} />
                <Route path="*" element={<Navigate to="/chat" />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/login" exact element={<Homepage />} />
                <Route
                    path="/register"
                    exact
                    element={<Register />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }
};
