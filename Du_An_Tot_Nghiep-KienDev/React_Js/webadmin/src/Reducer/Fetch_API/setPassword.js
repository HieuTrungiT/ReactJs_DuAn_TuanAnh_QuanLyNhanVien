import axios from "axios";
import { API_SET_PASSWORD } from '../../api/index';
import { setPasswordSucc, setPasswordFalse, setPasswordErr } from '../Actions/Auth/setPassWord';
// import * as types from '../actionTypes';

export const setPassword = (dispatch, formData) => {
    const Check_Login = localStorage.getItem('Save_Login');
    const Home = JSON.parse(Check_Login);
    formData.email = Home.email;
    axios.post(API_SET_PASSWORD,formData)
        .then(response => {
            {response.data.success === true ? dispatch(setPasswordSucc(response.data)) : dispatch(setPasswordFalse(response.data))}
            return response.data;
        })
        .catch(error => {
            dispatch(setPasswordErr(error))
        });
  }