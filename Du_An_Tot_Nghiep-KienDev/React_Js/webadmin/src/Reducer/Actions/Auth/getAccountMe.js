import { FETCH_ACCOUNT_ME_SUCCESS, FETCH_ACCOUNT_ME_ERROR, SET_AVATAR_ACCOUNT, ERR_AVATAR_ACCOUNT, GET_AVATAR_ACCOUNT_SUCC, GET_AVATAR_ACCOUNT_ERR } from "../../Constants/listConstants";
import { API_GET_URL_IMAGE } from '../../../api/index'

export const fetchAccountMeSuccess = (payload) => {
    return {
        type: FETCH_ACCOUNT_ME_SUCCESS,
        payload: payload
    }
}

export const fetchAccountMeError = (payload) => {
    return {
        type: FETCH_ACCOUNT_ME_ERROR,
        payload: payload
    }
}

export const setAvatarAccountSuccess = (payload) => {
    let renameKeys = (keysMap, payload) =>
        Object.keys(payload).reduce(
            (acc, key) => ({
                ...acc,
                ...{ [keysMap[key] || key]: payload[key] },
            }),
            {}
        );

    let result = renameKeys(
        {
            originalname: "name",
            filename: "url",
        },
        payload
    );

    result.url = API_GET_URL_IMAGE + result.url;

    return {
        type: SET_AVATAR_ACCOUNT,
        payload: result
    }
}

export const setAvatarAccountError = (payload) => {
    return {
        type: ERR_AVATAR_ACCOUNT,
        payload: payload
    }
}

export const getAvtMeSuccess = (payload) => {
    const getObj = payload[0];
    
    let renameKeys = (keysMap, getObj) =>
        Object.keys(getObj).reduce(
            (acc, key) => ({
                ...acc,
                ...{ [keysMap[key] || key]: getObj[key] },
            }),
            {}
        );

    let result = renameKeys(
        {
            ten: "name",
            image: "url",
        },
        getObj
    );

    result.url = result.url;
    // result.url = API_GET_URL_IMAGE + result.url;
    const abc = {
        name : result.name,
        url : result.url,
    }

    return {
        type: GET_AVATAR_ACCOUNT_SUCC,
        payload: abc
    }
}

export const getAvtMeError = (payload) => {
    return {
        type: GET_AVATAR_ACCOUNT_ERR,
        payload: payload
    }
}