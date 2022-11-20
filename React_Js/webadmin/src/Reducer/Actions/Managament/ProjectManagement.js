import * as constants from "../../Constants/listConstants";

export const setAddProjectTypeManagementSucc = (payload) => {
    return {
        type: constants.SET_ADD_PROJECT_TYPE_MANAGEMENT_SUCC,
        payload: payload
    }
}

export const setAddProjectTypeManagementFalse = (payload) => {
    return {
        type: constants.SET_ADD_PROJECT_TYPE_MANAGEMENT_FALSE,
        payload: payload
    }
}

export const setAddProjectTypeManagementErr = (payload) => {
    return {
        type: constants.SET_ADD_PROJECT_TYPE_MANAGEMENT_ERROR,
        payload: payload
    }
}

export const getListProjectTypeManagementErr = (payload) => {
    return {
        type: constants.GET_LIST_PROJECT_TYPE_MANAGEMENT,
        payload: payload
    }
}

export const setDelProjectTypeManagementSucc = (payload) => {
    return {
        type: constants.SET_DEL_PROJECT_TYPE_MANAGEMENT_SUCC,
        payload: payload
    }
}

export const setDelProjectTypeManagementFalse = (payload) => {
    return {
        type: constants.SET_DEL_PROJECT_TYPE_MANAGEMENT_FALSE,
        payload: payload
    }
}

export const setUpdateProjectTypeManagementSucc = (payload) => {
    return {
        type: constants.SET_UPDATE_PROJECT_TYPE_MANAGEMENT_SUCC,
        payload: payload
    }
}