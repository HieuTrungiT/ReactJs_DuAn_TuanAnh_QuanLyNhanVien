import { SET_PASSWORDS_SUCCESS, SET_PASSWORDS_FALSE, SET_PASSWORDS_ERROR } from '../../Constants/listConstants';
import { SuccessSetpass } from '../../../components/Message/Success';
import {WarningRegister} from '../../../components/Message/Warning';
import {ErrorAccountPassFalse} from '../../../components/Message/Error';

export const setPasswordRedux = (state , action) => {
    switch(action.type) {
        case SET_PASSWORDS_SUCCESS:
            SuccessSetpass();
            return {
                ...state,
                success: action.payload.success
            }
        case SET_PASSWORDS_FALSE:
            ErrorAccountPassFalse();
            return {
                ...state,
                success: action.payload.success
            }
        case SET_PASSWORDS_ERROR:
            WarningRegister();
            return {
                ...state,
            }
        default: 
        return {...state};
    }
}