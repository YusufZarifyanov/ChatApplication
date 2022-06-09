import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FriendsPage from "./pages/FriendsPage";
import LoginPage from "./pages/LoginPage";
import PersInfoPage from "./pages/PersInfoPage";
import PinCodePage from "./pages/PinCodePage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import MessageListPage from "./pages/MessageListPage";
import ChatPage from "./pages/ChatPage";
import UserInfoPage from "./pages/UserInfoPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/messages" exact element={<MessageListPage />} />
                <Route path="/settings" exact element={<SettingsPage />} />
                <Route path="/friends" exact element={<FriendsPage />} />
                <Route path="/chat" exact element={<ChatPage />} />
                <Route path="*" element={<Navigate to="/messages" />} />
                <Route path="/settings/pers-info" exact element={<UserInfoPage />} />
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
