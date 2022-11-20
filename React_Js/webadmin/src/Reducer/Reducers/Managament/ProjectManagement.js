import * as constants from '../../Constants/listConstants';
import * as succ from '../../../components/Message/Success';
import { WarningRegister } from '../../../components/Message/Warning';
import * as fal from '../../../components/Message/Error';

export const setAddTypeProjectMana = (state, action) => {
    switch (action.type) {
        case constants.SET_ADD_PROJECT_TYPE_MANAGEMENT_SUCC:
            succ.SuccessAdd();
            return {
                ...state,
                message: action.payload.success
            }
        case constants.SET_DEL_PROJECT_TYPE_MANAGEMENT_SUCC:
            succ.SuccessDel();
            return {
                ...state,
                message: action.payload.success
            }
        case constants.SET_UPDATE_PROJECT_TYPE_MANAGEMENT_SUCC:
            succ.SuccessRegister();
            return {
                ...state,
                message: action.payload.success
            }
        case constants.SET_DEL_PROJECT_TYPE_MANAGEMENT_FALSE:
            fal.ErrorFALSEHeThong();
            return {
                ...state,
                message: action.payload.success
            }
        case constants.SET_ADD_PROJECT_TYPE_MANAGEMENT_FALSE:
            fal.ErrorAdd();
            return {
                ...state,
                message: action.payload.success
            }
        case constants.GET_LIST_PROJECT_TYPE_MANAGEMENT:
            return {
                ...state,
                data: action.payload
            }
        case constants.SET_ADD_PROJECT_TYPE_MANAGEMENT_ERROR:
            WarningRegister();
            return {
                ...state,
            }
        default:
            return { ...state };
    }
}