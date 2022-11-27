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
export const setAddProjectTypeManagementFalsel = (payload) => {
    return {
        type: constants.SET_ADD_PROJECT_TYPE_MANAGEMENT_FALSEL,
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

export const getListUserLeaders = (payload) => {
    return {
        type: constants.GET_LIST_DATA_USER_LEADER,
        payload: payload
    }
}
export const getListUserStaffs = (payload) => {
    return {
        type: constants.GET_LIST_DATA_USER_STAFFS,
        payload: payload
    }
}
export const UploadSucc = (payload) => {
    return {
        type: constants.SET_UPLOAD_SUCC,
        payload: payload
    }
}

export const getListGrSucc = (payload) => {
    return {
        type: constants.GET_LIST_GR_SUCC,
        payload: payload
    }
}

export const getListDetailsSucc = (payload) => {
    return {
        type: constants.GET_LIST_DETAIL_GR_LIST_SUCC,
        payload: payload
    }
}
export const getListDetailsFalse = (payload) => {
    return {
        type: constants.GET_LIST_DETAIL_GR_LIST_FALSE,
        payload: payload
    }
}

export const getListDetailsErr = (payload) => {
    return {
        type: constants.GET_LIST_DETAIL_GR_LIST_ERR,
        payload: payload
    }
}