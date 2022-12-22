import { GET_LIST_ACCOUNT_STAFF, GET_LIST_ACCOUNT_STAFF_ERR, SET_ACCOUNT_STAFF_USER_SUCCESS, SET_ACCOUNT_STAFF_USER_FALSE, SET_ACCOUNT_STAFF_USER_ERROR,
    GET_NEW_ACCOUNT_STAFF_USER_SUCC, GET_NEW_ACCOUNT_STAFF_USER_FALSE, GET_NEW_ACCOUNT_STAFF_USER_ERROR, SET_NEW_ACCOUNT_STAFF_USER_SUCCESS , SET_NEW_ACCOUNT_STAFF_USER_ERROR,
    SET_NEW_ACCOUNT_STAFF_USER_CANCEL, SET_BAN_ACCOUNT_SUCCESS, SET_BAN_ACCOUNT_ERROR, SET_DEF_BAN_ACCOUNT_SUCCESS, SET_POSITION_ACCOUNT_SUCCESS, 
    GET_LIST_ACCOUNT_BAN_API_ERR, GET_LIST_ACCOUNT_BAN_API_FALSE, GET_LIST_ACCOUNT_BAN_API_SUCC, SET_UN_ACCOUNT_USER_ERR,SET_UN_ACCOUNT_USER,GET_LIST_ACCOUNT_FORGOT_SUC,
    GET_LIST_ACCOUNT_FORGOT_ERR, SET_PASS_ACCOUNT_FALSE, SET_PASS_ACCOUNT_SUCC
} from "../../Constants/listConstants";

export const getListAccountSuc = (payload) => {
    return {
        type: GET_LIST_ACCOUNT_STAFF,
        payload: payload
    }
}

export const getListAccountErr = (payload) => {
    return {
        type: GET_LIST_ACCOUNT_STAFF_ERR,
    }
}

export const setAccountSuccess = (payload) => {
    return {
        type: SET_ACCOUNT_STAFF_USER_SUCCESS,
        payload: payload
    }
}
export const setAccountFalse = (payload) => {
    return {
        type: SET_ACCOUNT_STAFF_USER_FALSE,
        payload: payload
    }
}
export const setAccountError = (payload) => {
    return {
        type: SET_ACCOUNT_STAFF_USER_ERROR,
        payload: payload
    }
}

export const getAccountNewStaffSucc = (payload) => {
    return {
        type: GET_NEW_ACCOUNT_STAFF_USER_SUCC,
        payload: payload
    }
}
export const getAccountNewStaffFalse = (payload) => {
    return {
        type: GET_NEW_ACCOUNT_STAFF_USER_FALSE,
        payload: payload
    }
}

export const getAccountNewStaffErr = (payload) => {
    return {
        type: GET_NEW_ACCOUNT_STAFF_USER_ERROR,
        payload: payload
    }
}

export const setAccountNewStaffSucc = (payload) => {
    return {
        type: SET_NEW_ACCOUNT_STAFF_USER_SUCCESS,
        payload: payload
    }
}

export const setAccountNewStaffCancel = (payload) => {
    return {
        type: SET_NEW_ACCOUNT_STAFF_USER_CANCEL,
        payload: payload
    }
}

export const setAccountNewStaffErr = (payload) => {
    return {
        type: SET_NEW_ACCOUNT_STAFF_USER_ERROR,
        payload: payload
    }
}

export const setAccountBanSuc = (payload) => {
    return {
        type: SET_BAN_ACCOUNT_SUCCESS,
        payload: payload
    }
}

export const setAccountBanErr = (payload) => {
    return {
        type: SET_BAN_ACCOUNT_ERROR,
        payload: payload
    }
}

export const setAccountDefaulbanSuc = (payload) => {
    return {
        type: SET_DEF_BAN_ACCOUNT_SUCCESS,
        payload: payload
    }
}
export const setPositionAccountSuc = (payload) => {
    return {
        type: SET_POSITION_ACCOUNT_SUCCESS,
        payload: payload
    }
}

export const getListAccountBanSuccess = (payload) => {
    return {
        type: GET_LIST_ACCOUNT_BAN_API_SUCC,
        payload: payload
    }
}

export const getListAccountBanFalse = (payload) => {
    return {
        type: GET_LIST_ACCOUNT_BAN_API_FALSE,
        payload: payload
    }
}
export const getListAccountBanError = (payload) => {
    return {
        type: GET_LIST_ACCOUNT_BAN_API_ERR,
        payload: payload
    }
}

export const setUnAccountUser = (payload) => {
    return {
        type: SET_UN_ACCOUNT_USER,
        payload: payload
    }
}

export const setUnAccountUsererr = (payload) => {
    return {
        type: SET_UN_ACCOUNT_USER_ERR,
        payload: payload
    }
}

export const getListAccountUserForgotPw = (payload) => {
    return {
        type: GET_LIST_ACCOUNT_FORGOT_SUC,
        payload: payload
    }
}

export const getListAccountUserForgotPwErr = (payload) => {
    return {
        type: GET_LIST_ACCOUNT_FORGOT_ERR,
        payload: payload
    }
}

export const setAccountPasswordSucc = (payload) => {
    return {
        type: SET_PASS_ACCOUNT_SUCC,
        payload: payload
    }
}

export const setAccountPasswordFalse = (payload) => {
    return {
        type: SET_PASS_ACCOUNT_FALSE,
        payload: payload
    }
}