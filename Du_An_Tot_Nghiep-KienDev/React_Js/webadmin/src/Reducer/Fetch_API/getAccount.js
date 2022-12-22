import axios from 'axios';
import { API_GET_ACCOUNT } from '../../api/index';
import {fetchAccountMeError, fetchAccountMeSuccess, getAvtMeSuccess, getAvtMeError } from '../Actions/Auth/getAccountMe';
// import * as types from '../actionTypes';


export default function fetchProducts(dispatch) {
    const Check_Login = localStorage.getItem('Save_Login');
    const Home = JSON.parse(Check_Login);
    axios.post(API_GET_ACCOUNT, {
        email: Home.email,
    })
        .then(response => {
            dispatch(fetchAccountMeSuccess(response.data))
            return response.data;
        })
        .catch(error => {
            dispatch(fetchAccountMeError(error))
        });
}

export const getAvatarAccount = (getDispatchImg) => {
    const Check_Login = localStorage.getItem('Save_Login');
    const Home = JSON.parse(Check_Login);
    axios.post(API_GET_ACCOUNT, {
        email: Home.email,
    })
        .then(response => {
            getDispatchImg(getAvtMeSuccess(response.data))
            return response.data;
        })
        .catch(error => {
            getDispatchImg(getAvtMeError(error))
        });
}