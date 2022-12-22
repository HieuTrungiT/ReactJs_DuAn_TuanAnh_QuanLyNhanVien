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
        case constants.SET_ADD_PROJECT_TYPE_MANAGEMENT_FALSEL:
            fal.ErrorAdds();
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
        case constants.GET_LIST_GR_SUCC:
            return {
                ...state,
                dataGr: action.payload
            }
        case constants.GET_LIST_GR_SUCCS:
            return {
                ...state,
                dataGr: action.payload
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

export const getListUserLeader = (state, action) => {
    switch (action.type) {
        case constants.GET_LIST_DATA_USER_LEADER:
            const op = action.payload.map(value => {
                const { id, ten } = value;
                return { value: id, label: ten }
            })
            return {
                ...state,
                dataleader: op,
            }
        case constants.GET_LIST_DATA_USER_STAFFS:
            const opstaff = action.payload.map(value => {
                const { id, ten } = value;
                return { value: id, label: ten }
            })
            return {
                ...state,
                datastaff: opstaff,
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

export const getUploadIMG = (state, action) => {
    switch (action.type) {
        case constants.SET_UPLOAD_SUCC:
            return {
                ...state,
                dataImg: action.payload
            }
        default:
            return { ...state };
    }
}

export const getListDetailGr = (state, action) => {
    switch (action.type) {
        case constants.GET_LIST_DETAIL_GR_LIST_SUCC:
            return {
                ...state,
                deltailID: action.payload
            }
        case constants.GET_LIST_DETAIL_GR_LIST_FALSE:
            fal.Fasle_gr_listDetail();
            return {
                ...state,
            }
        case constants.GET_LIST_DETAIL_GR_LIST_ERR:
            WarningRegister();
            return {
                ...state,
            }
        case constants.GET_MANAGER:
            return {
                ...state,
                user: {
                    ...state.user,
                    manager: action.payload
                }
            }
        case constants.GET_MANAGER_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    user: action.payload
                }
            }
        default:
            return { ...state };
    }
}