import { SET_PASSWORDS_SUCCESS, SET_PASSWORDS_FALSE, SET_PASSWORDS_ERROR} from "../../Constants/listConstants";

export const setPasswordSucc = (payload) => {
    return {
        type: SET_PASSWORDS_SUCCESS,
        payload: payload
    }
}

export const setPasswordFalse = (payload) => {
    return {
        type: SET_PASSWORDS_FALSE,
        payload: payload
    }
}

export const setPasswordErr = (payload) => {
    return {
        type: SET_PASSWORDS_ERROR,
        payload: payload
    }
}