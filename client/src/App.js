import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import io from "socket.io-client";
import Homepage from "./pages/HomePage";
import "./App.scss"
import Register from "./components/Register";

const socket = io.connect("/");

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" exact element={<Homepage />} /> 
                    <Route path="/register" exact element={<Register />} />  
                </Routes>
            </div>
        </Router>
    );
};

export default App;
