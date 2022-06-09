import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducer";
import { Provider } from "react-redux";
const {createDiffieHellman, DiffieHellman} = require("crypto");

const store = configureStore({ reducer: rootReducer });

// const alice = createDiffieHellman(100, {
    
// })
// const pubAlice = alice.generateKeys('base64')

// console.log(pubAlice)

// const alice = createDiffieHellman(201);
// const aliceKey = alice.generateKeys();
// console.log(alice.getPrime().toString("hex"), alice.getGenerator())
// console.log('prime', alice.getPrime())
// console.log("generator", alice.getGenerator())


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
