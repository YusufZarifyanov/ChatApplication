import { ADD_COUPLE_KEYS, SET_SOCKET } from "../actions/types";

export default function keysReducer(state = {keys: 5, socket: null}, action) {
    switch (action.type) {
        case ADD_COUPLE_KEYS:
            return { ...state, keys: action.payload };
        case SET_SOCKET:
            return {...state, socket: action.payload}
        default:
            return state;
    }
}
