import {
    SET_JOBS_LOGIN, SET_JOBS_REGISTER, SET_JOBS_FORGOT_PASSWORD, CHECK_FALSE_SAVE_ACCOUNT, CHECK_SUCCESS_SAVE_ACCOUNT
} from "../../Constants/listConstants"
import axios from 'axios';
import { API_REGISTER, API_FORGOT_PW } from '../../../api/index';
import { SuccessRegister, SuccessForgotPw } from '../../../components/Message/Success';
import { ErrorRegister, ErrorForgotPW } from '../../../components/Message/Error';
import { WarningRegister } from '../../../components/Message/Warning';

export const SetJobLogin = (payload, check = payload.admin) => {

    let hello = check === true ? SET_JOBS_LOGIN : SET_JOBS_LOGIN;
    TokenLogin(payload);
    return {
        type: hello,
        payload,
    }
}
export const SetJobRegister = payload => {
    axios.post(API_REGISTER, payload)
        .then(response => {
            if (response.data.success === true) {
                SuccessRegister()
            } else {
                ErrorRegister()
            }
        })
        .catch(error => {
            WarningRegister()
        });
    return {
        type: SET_JOBS_REGISTER,
        payload
    }
}

export const SetJobForgotPassword = payload => {
    axios.post(API_FORGOT_PW, payload)
        .then(response => {
            if (response.data.success === true) {
                SuccessForgotPw();
            } else {
                ErrorForgotPW()
            }
        })
        .catch(error => {
            WarningRegister()
        });
    return {
        type: SET_JOBS_FORGOT_PASSWORD,
        payload
    }
}

export const SetJobForgotPasswords = payload => {
    const Check_Login = localStorage.getItem('Save_Login');
    const Home = JSON.parse(Check_Login);
    axios.post(API_FORGOT_PW, {
        dateTime : payload ,
        email : Home.email
    })
        .then(response => {
            if (response.data.success === true) {
                SuccessForgotPw();
            } else {
                ErrorForgotPW()
            }
        })
        .catch(error => {
            WarningRegister()
        });
    return {
        type: SET_JOBS_FORGOT_PASSWORD,
    }
}

export const TokenLogin = payload => {
    if (payload.checked === true) {
        delete payload.passWord;
        localStorage.setItem('Save_Login', JSON.stringify({ checked: 'true', email: payload.email, phanquyen: payload.admin }));
        return {
            type: CHECK_SUCCESS_SAVE_ACCOUNT,
            payload
        }
    } else {
        delete payload.passWord;
        localStorage.setItem('Save_Login', JSON.stringify({ checked: 'false', email: payload.email,phanquyen: payload.admin }));
        return {
            type: CHECK_FALSE_SAVE_ACCOUNT,
            payload
        }
    }
};