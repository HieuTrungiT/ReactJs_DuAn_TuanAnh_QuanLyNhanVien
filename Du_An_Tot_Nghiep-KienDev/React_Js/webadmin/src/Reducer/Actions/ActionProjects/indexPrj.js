import * as constants from "../../Constants/listConstants";

export const setAddSuccsetProject = (payload) => {
    return {
        type: constants.SET_ADD_PROJECTS_SUCCESS,
        payload: payload
    }
}
export const setAddFalseProject = (payload) => {
    return {
        type: constants.SET_ADD_PROJECTS_FALSE,
        payload: payload
    }
}
export const setAddErrorProject = (payload) => {
    return {
        type: constants.SET_ADD_PROJECTS_ERROR,
        payload: payload
    }
}

export const getListProjOpen = (payload) => {
    return {
        type: constants.GET_LIST_PROJECT_OPEN,
        payload: payload
    }
}
export const getListAllProj = (payload) => {
    return {
        type: constants.GET_LIST_PROJECT_FULL,
        payload: payload
    }
}
export const getListProjFalse = (payload) => {
    return {
        type: constants.GET_LIST_PROJECT_FALSE,
        payload: payload
    }
}

export const getUserLeader = (payload) => {
    return {
        type: constants.GET_USER_LEADER,
        payload: payload
    }
}