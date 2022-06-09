import { createContext } from "react";

function noop() {}

export const GeneralContext = createContext({
    socket: null,
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    chatInfo: null,
    setChatInfo: noop,
})