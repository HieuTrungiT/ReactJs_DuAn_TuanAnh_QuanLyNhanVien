import axios from 'axios';
import * as types from '../../api/index';
import * as actions from '../Actions/Managament/ProjectManagement';
import * as action from '../Actions/ActionProjects/indexPrj';
import { DATE_TIME } from '../../components/DateTime/DateTime';
import { Type_Slug } from '../../components/slug/index_slug';

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

export function getListDataGr(dispatch) {
    axios.get(types.API_GET_LIST_GR_TYPE)
        .then(response => {
            dispatch(actions.getListGrSucc(response.data))
            return response.data;
        })
        .catch(error => {
            dispatch(actions.setAddProjectTypeManagementErr(error))
        });
}

export function setAddTypeProjectForm({ dispatchAdditem, name }) {
    axios.post(types.API_ADD_PROJECT_MANAGEMENT, {
        nameTypeProject: name,
        timeRegister: DATE_TIME
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

export function getListDataUserLeader(dispatchLeader) {
    axios.get(types.API_GET_LIST_USER_LEADER)
        .then(response => {
            dispatchLeader(actions.getListUserLeaders(response.data))
            return response.data;
        })
        .catch(error => {
            dispatchLeader(actions.setAddProjectTypeManagementErr(error))
        });
}

export function getListDataUserStaff(dispatchStaff) {
    axios.get(types.API_GET_LIST_USER_USER)
        .then(response => {
            dispatchStaff(actions.getListUserStaffs(response.data))
            return response.data;
        })
        .catch(error => {
            dispatchStaff(actions.setAddProjectTypeManagementErr(error))
        });
}

export function setAddGroupUser({ dispatch, values }) {
    axios.post(types.API_SET_ADD_GR, values)
        .then(response => {
            {
                response.data.success === true ?
                    dispatch(actions.setAddProjectTypeManagementSucc(response.data))
                    :
                    dispatch(actions.setAddProjectTypeManagementFalsel(response.data))
            }
            return response.data;
        })
        .catch(error => {
            dispatch(actions.setAddProjectTypeManagementErr(error))
        });
}

export function upload({ dispatchUpload, file }) {
    const formData = new FormData();
    formData.append('file', file);
    axios.post(types.API_SET_DEL_AVATAR_ACCOUNT, formData)
        .then(response => {
            dispatchUpload(actions.UploadSucc(response.data))
        })
        .catch();
}

export function getDataDetailListGRMember({ dispatch, slug }) {
    axios.post(types.API_GET_DETAIL_GR, { slugs: slug })
        .then(response => {
            {
                response.data?.success === false ?
                    dispatch(actions.getListDetailsFalse(response.data))
                    :
                    dispatch(actions.getListDetailsSucc(response.data))
            }
            return response.data;
        })
        .catch(error => {
            dispatch(actions.getListDetailsErr(error))
        });
}

export function getManager({ dispatchManage, id }) {
    axios.post(types.API_GET_DETAIL_ACCOUNT, { id: id })
        .then(response => {
            dispatchManage(actions.getManage(response.data))
            return response.data;
        })
        .catch(error => {
            dispatchManage(actions.getListDetailsErr(error))
        });
}

export function getManagerUser({ dispatchUser, heads }) {
    axios.post(types.API_GET_USER_PROJ, { id: heads })
        .then(response => {
            dispatchUser(actions.getManageUser(response.data))
            return response.data;
        })
        .catch(error => {
            dispatchUser(actions.getListDetailsErr(error))
        });
}

export function getListGrUser(dispatchGr) {
    axios.get(types.API_GET_LIST_GR_TYPE)
        .then(response => {
            dispatchGr(actions.getListGrSuccs(response.data))
            return response.data;
        })
        .catch(error => {
            dispatchGr(actions.setAddProjectTypeManagementErr(error))
        });
}

export function setAddFormPj({ values, dispatchAddPrj, img }) {
    values.StartProject = true;
    values.UpdateImg = img;
    values.slugs = Type_Slug(values.nameProject)
    values.dateUpdate = new Date().toISOString();
    axios.post(types.API_SET_ADD_NEW_PROJECTS, values)
        .then(response => {
            {
                response.data.success === false ?
                    dispatchAddPrj(action.setAddFalseProject(response.data))
                    :
                    dispatchAddPrj(action.setAddSuccsetProject(response.data))
            }
            return response.data;
        })
        .catch(error => {
            dispatchAddPrj(action.setAddErrorProject(error))
        });
}

export function setAddFormPjs({ values, dispatchAddPrj, img }) {
    values.StartProject = false;
    values.UpdateImg = img;
    values.slugs = Type_Slug(values.nameProject)
    values.dateUpdate = new Date().toISOString();
    axios.post(types.API_SET_ADD_NEW_PROJECTS, values)
        .then(response => {
            {
                response.data.success === false ?
                    dispatchAddPrj(action.setAddFalseProject(response.data))
                    :
                    dispatchAddPrj(action.setAddSuccsetProject(response.data))
            }
            return response.data;
        })
        .catch(error => {
            dispatchAddPrj(action.setAddErrorProject(error))
        });
}

export function getListProjOpen({ dispatch, data }) {
    axios.post(types.API_GET_LIST_PROJECT_OPEN, { data: data })
        .then(response => {
            dispatch(action.getListProjOpen(response.data))
            return response.data;
        })
        .catch(error => {
            dispatch(action.getListProjFalse(error))
        });
}

export function getUserID({ dispatch, data }) {
    axios.post(types.API_GET_USER_LEADER_PROJ, data)
        .then(response => {
            dispatch(action.getUserLeader(response.data))
            return response.data;
        })
        .catch(error => {
            dispatch(action.getListProjFalse(error))
        });
}

export function getListAllProj(dispatch) {
    axios.get(types.API_GET_ALL_PROJ)
        .then(response => {
            dispatch(action.getListAllProj(response.data))
            return response.data;
        })
        .catch(error => {
            dispatch(action.getListProjFalse(error))
        });
}