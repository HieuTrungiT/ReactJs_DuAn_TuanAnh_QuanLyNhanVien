import axios from 'axios';
import * as types from '../../api/index';
import * as actions from '../Actions/Managament/ProjectManagement';
import { DATE_TIME } from '../../components/DateTime/DateTime';

export function setAddTypeProject({ dispatch, values }) {
    axios.post(types.API_ADD_PROJECT_MANAGEMENT, values)
        .then(response => {
            {
                response.data.success === true ?
                    dispatch(actions.setAddProjectTypeManagementSucc(response.data))
                    :
                    dispatch(actions.setAddProjectTypeManagementFalse(response.data))
            }
            return response.data;
        })
        .catch(error => {
            dispatch(actions.setAddProjectTypeManagementErr(error))
        });
}

export function setUpdateTypeProject({ dispatch, values }) {
    axios.post(types.API_UPDATE_PROJECT_MANAGEMENT, values)
        .then(response => {
            dispatch(actions.setUpdateProjectTypeManagementSucc(response.data))
            return response.data;
        })
        .catch(error => {
            dispatch(actions.setAddProjectTypeManagementErr(error))
        });
}

export function setDelTypeProject({ dispatchDel, e }) {
    axios.post(types.API_DEL_PROJECT_MANAGEMENT, { id: e })
        .then(response => {
            {
                response.data.success === true ?
                    dispatchDel(actions.setDelProjectTypeManagementSucc(response.data))
                    :
                    dispatchDel(actions.setDelProjectTypeManagementFalse(response.data))
            }
            return response.data;
        })
        .catch(error => {
            dispatchDel(actions.setAddProjectTypeManagementErr(error))
        });
}


export function getListTypeProject(dispatch) {
    axios.get(types.API_LIST_PROJECT_MANAGEMENT)
        .then(response => {
            dispatch(actions.getListProjectTypeManagementErr(response.data))
            return response.data;
        })
        .catch(error => {
            dispatch(actions.setAddProjectTypeManagementErr(error))
        });
}

export function setAddTypeProjectForm({ dispatchAdditem, name }) {
    axios.post(types.API_ADD_PROJECT_MANAGEMENT, {
        nameTypeProject : name,
        timeRegister : DATE_TIME
    })
        .then(response => {
            {
                response.data.success === true ?
                    dispatchAdditem(actions.setAddProjectTypeManagementSucc(response.data))
                    :
                    dispatchAdditem(actions.setAddProjectTypeManagementFalse(response.data))
            }
            return response.data;
        })
        .catch(error => {
            dispatchAdditem(actions.setAddProjectTypeManagementErr(error))
        });
}