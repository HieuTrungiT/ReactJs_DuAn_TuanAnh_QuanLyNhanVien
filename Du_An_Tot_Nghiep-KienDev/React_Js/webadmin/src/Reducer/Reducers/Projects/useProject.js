import * as constants from '../../Constants/listConstants';
import * as succ from '../../../components/Message/Success';
import { WarningRegister } from '../../../components/Message/Warning';
import * as fal from '../../../components/Message/Error';

export const ActionPrj = (state, action) => {
    switch (action.type) {
        case constants.SET_ADD_PROJECTS_SUCCESS:
            succ.SuccessAdd();
            return {
                ...state,
                event:{
                    ...state.event,
                    add: action.payload
                }
            }
        case constants.SET_ADD_PROJECTS_FALSE:
            fal.ErrorAddProject();
            return {
                ...state,
                event:{
                    ...state.event,
                    add: action.payload
                }
            }
        case constants.SET_ADD_PROJECTS_ERROR:
            WarningRegister();
            return {
                ...state,
            }
        default:
            return { ...state };
    }
}

export const GetListProj = (state, action) => {
    switch (action.type) {
        case constants.GET_LIST_PROJECT_OPEN:
            return {
                ...state,
                project:{
                    ...state.project,
                    open: action.payload
                }
            }
        case constants.GET_LIST_PROJECT_FULL:
            return {
                ...state,
                project:{
                    ...state.project,
                    full: action.payload
                }
            }
        case constants.GET_USER_LEADER:
            return {
                ...state,
                user:{
                    ...state.user,
                    leader: action.payload
                }
            }
        case constants.GET_LIST_PROJECT_FALSE:
            WarningRegister();
            return {
                ...state,
            }
        default:
            return { ...state };
    }
}