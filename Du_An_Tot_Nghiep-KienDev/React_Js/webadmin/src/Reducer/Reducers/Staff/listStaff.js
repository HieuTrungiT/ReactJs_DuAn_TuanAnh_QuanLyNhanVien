import {
    GET_LIST_ACCOUNT_STAFF, GET_LIST_ACCOUNT_STAFF_ERR, SET_ACCOUNT_STAFF_USER_SUCCESS, SET_ACCOUNT_STAFF_USER_FALSE, SET_ACCOUNT_STAFF_USER_ERROR,
    GET_NEW_ACCOUNT_STAFF_USER_SUCC, GET_NEW_ACCOUNT_STAFF_USER_FALSE, GET_NEW_ACCOUNT_STAFF_USER_ERROR, SET_NEW_ACCOUNT_STAFF_USER_SUCCESS, SET_NEW_ACCOUNT_STAFF_USER_ERROR,
    SET_NEW_ACCOUNT_STAFF_USER_CANCEL, SET_BAN_ACCOUNT_SUCCESS, SET_BAN_ACCOUNT_ERROR, SET_DEF_BAN_ACCOUNT_SUCCESS, SET_POSITION_ACCOUNT_SUCCESS,
    GET_LIST_ACCOUNT_BAN_API_ERR, GET_LIST_ACCOUNT_BAN_API_FALSE, GET_LIST_ACCOUNT_BAN_API_SUCC, SET_UN_ACCOUNT_USER_ERR, SET_UN_ACCOUNT_USER, GET_LIST_ACCOUNT_FORGOT_ERR,
    GET_LIST_ACCOUNT_FORGOT_SUC, SET_PASS_ACCOUNT_SUCC, SET_PASS_ACCOUNT_FALSE,
} from '../../Constants/listConstants';
import { WarningRegister } from '../../../components/Message/Warning';
import { ErrorRegister, ErrorFALSE } from '../../../components/Message/Error';
import { SuccessRegisterStaff, SuccessRegister, SuccessNewAccountCancel, SuccessSetUnLockAccount, SuccessSetLockAccount, SuccessPositionAccount,
    SuccessUpdateAccount } from '../../../components/Message/Success';

export const getListStaffs = (state, action) => {
    switch (action.type) {
        case GET_LIST_ACCOUNT_STAFF:
            return {
                ...state,
                all: action.payload,
                total: action.payload.length,
                show: action.payload.slice(0, 5),
            }
        case GET_LIST_ACCOUNT_STAFF_ERR:
            WarningRegister();
            return {
                ...state
            }
        default:
            return [...state];
    }
}

export const AddCountUser = (state, action) => {
    switch (action.type) {
        case SET_ACCOUNT_STAFF_USER_SUCCESS:
            SuccessRegisterStaff();
            return {
                ...state,
                action: action.payload.success
            }
        case SET_ACCOUNT_STAFF_USER_ERROR:
            WarningRegister();
            return {
                ...state
            }
        case SET_ACCOUNT_STAFF_USER_FALSE:
            ErrorRegister();
            return {
                ...state,
                action: action.payload.success
            }
        default:
            return [...state];
    }
}

export const getListDataAccountNew = (state, action) => {
    switch (action.type) {
        case GET_NEW_ACCOUNT_STAFF_USER_SUCC:
            return {
                ...state,
                all: action.payload,
            }
        case GET_NEW_ACCOUNT_STAFF_USER_FALSE:
            return {
                ...state,
                all: {}
            }
        case GET_NEW_ACCOUNT_STAFF_USER_ERROR:
            WarningRegister();
            return {
                ...state
            }
        default:
            return { ...state };
    }
}

export const setListDataAccountNewAgr = (state, action) => {
    switch (action.type) {
        case SET_NEW_ACCOUNT_STAFF_USER_SUCCESS:
            SuccessRegister();
            return {
                ...state,
                all: action.payload,
            }
        case SET_NEW_ACCOUNT_STAFF_USER_CANCEL:
            SuccessNewAccountCancel();
            return {
                ...state,
                all: action.payload,
            }
        case SET_NEW_ACCOUNT_STAFF_USER_ERROR:
            ErrorFALSE();
            return {
                ...state,
                all: {}
            }
        default:
            return { ...state };
    }
}

export const setBanAccountStaff = (state, action) => {
    switch (action.type) {
        case SET_BAN_ACCOUNT_SUCCESS:
            SuccessSetLockAccount();
            return {
                ...state,
                all: action.payload,
            }
        case SET_DEF_BAN_ACCOUNT_SUCCESS:
            SuccessSetUnLockAccount();
            return {
                ...state,
                all: action.payload,
            }
        case SET_POSITION_ACCOUNT_SUCCESS:
            SuccessPositionAccount();
            return {
                ...state,
                all: action.payload,
            }
        case SET_BAN_ACCOUNT_ERROR:
            WarningRegister();
            return {
                ...state,
            }
        default:
            return { ...state };
    }
}

export const getLisTAccountBanReducer = (state, action) => {
    switch (action.type) {
        case GET_LIST_ACCOUNT_BAN_API_SUCC:
            return {
                ...state,
                all: action.payload,
                length : action.payload.length,
            }
        case GET_LIST_ACCOUNT_BAN_API_FALSE:
            return {
                ...state,
                all: action.payload,
                length : action.payload.length,
            }
        case GET_LIST_ACCOUNT_BAN_API_ERR:
            WarningRegister();
            return {
                ...state,
            }
        default:
            return { ...state };
    }
}

export const UpdateUnBanUserAccount = (state, action) => {
    switch (action.type) {
        case SET_UN_ACCOUNT_USER:
            SuccessUpdateAccount();
            return {
                ...state,
                all: action.payload,
            }
        case SET_UN_ACCOUNT_USER_ERR:
            WarningRegister();
            return {
                ...state,
            }
        default:
            return { ...state };
    }
}

export const ForgetAccountListGet = (state, action) => {
    switch (action.type) {
        case GET_LIST_ACCOUNT_FORGOT_SUC:
            return {
                ...state,
                all: action.payload,
            }
        case GET_LIST_ACCOUNT_FORGOT_ERR:
            WarningRegister();
            return {
                ...state,
            }
        default:
            return { ...state };
    }
}

export const setResetPass = (state, action) => {
    switch (action.type) {
        case SET_PASS_ACCOUNT_SUCC:
            return {
                ...state,
                all: action.payload,
            }
        case SET_PASS_ACCOUNT_FALSE:
            WarningRegister();
            return {
                ...state,
            }
        default:
            return { ...state };
    }
}