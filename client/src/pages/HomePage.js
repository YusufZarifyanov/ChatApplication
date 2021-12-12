import React from "react";
import Login from "../components/Login";
import "../styles/HomePage.scss";

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="left"></div>

            <div className="right">
                <Login />
            </div>
        </div>
    );
};

export default Homepage;
