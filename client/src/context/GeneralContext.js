import { createContext } from "react";

function noop() {}

export const GeneralContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
})