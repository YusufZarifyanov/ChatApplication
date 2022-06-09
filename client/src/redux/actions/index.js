// import uuidv4 from "uuid/v4";
import { ADD_COUPLE_KEYS, SET_SOCKET } from "./types";

export const addKeys = ({ user_id, publicKey, privateKey }) => ({
    type: ADD_COUPLE_KEYS,
    payload: {
        // id: uuidv4(),
        user_id,
        publicKey,
        privateKey
    },
});

export const addSocketAction = (socket) => ({
    type: SET_SOCKET,
    payload: socket
})
