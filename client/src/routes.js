import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import FriendsPage from "./pages/FriendsPage";
import LoginPage from "./pages/LoginPage";
import PersInfoPage from "./pages/PersInfoPage";
import PinCodePage from "./pages/PinCodePage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/chat" exact element={<ChatPage />} />
                <Route path="/settings" exact element={<SettingsPage />} />
                <Route path="/friends" exact element={<FriendsPage />} />
                <Route path="*" element={<Navigate to="/chat" />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/register" exact element={<RegisterPage />} />
                <Route path="/login" exact element={<LoginPage />} />
                <Route path="/pin-code" exact element={<PinCodePage />} />
                <Route path="/pers-info" exact element={<PersInfoPage />} />
                <Route path="*" element={<Navigate to="/register" />} />
            </Routes>
        );
    }
};
