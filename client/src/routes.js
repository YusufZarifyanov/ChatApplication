import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"

export const useRoutes = (isAuthenticated=false) => {
    return (
        <Routes>
            <Route path="/register" exact element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
    )
    // if (isAuthenticated) {
    //     return (
    //         <Routes>
    //             <Route path="/chat" exact element={<Chatpage />} />
    //             <Route path="*" element={<Navigate to="/chat" />} />
    //         </Routes>
    //     );
    // } else {
    //     return (
    //         <Routes>
    //             <Route path="/login" exact element={<Homepage />} />
    //             <Route
    //                 path="/register"
    //                 exact
    //                 element={<Register />}
    //             />
    //             <Route path="*" element={<Navigate to="/login" />} />
    //         </Routes>
    //     );
    // }
};
