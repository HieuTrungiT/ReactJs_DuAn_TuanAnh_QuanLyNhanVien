import axios from 'axios';
import { API_SET_AVATAR_ACCOUNT } from '../../api/index';
import { setAvatarAccountSuccess, setAvatarAccountError } from '../Actions/Auth/getAccountMe';
// import * as types from '../actionTypes';

export const setAvatarAccount = (dispatch, formData) => {
  axios.post(API_SET_AVATAR_ACCOUNT,formData)
      .then(response => {
          dispatch(setAvatarAccountSuccess(response.data))
          return response.data;
      })
      .catch(error => {
          dispatch(setAvatarAccountError(error))
      });
}