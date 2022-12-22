import * as init from '../../../../Reducer/InitReducer/InitProject/indexPrj';
import * as Reducer from '../../../../Reducer/Reducers/Projects/useProject';
import * as typeAPI from '../../../../Reducer/Fetch_API/ApiTypeProject';
import React, { useReducer, useEffect } from 'react';
import { API_GET_URL_IMAGE, API_GET_URL_IMAGE_USER_OUTLINE } from '../../../../api/index';

const UserLeaderTab = (data) => {
    const [state, dispatch] = useReducer(Reducer.GetListProj, init.ActionTypeProject);
    useEffect(() => {
        typeAPI.getUserID({ dispatch, data })
    }, []);

    return (
        <>
            {
                state.user.leader.length > 0 && state.user.leader.map((value, index) => {
                    return (
                        <div key={index} className="flex items-center space-x-4">
                            <img className="w-7 h-7 rounded-full" src={value.image ? API_GET_URL_IMAGE + value.image : API_GET_URL_IMAGE_USER_OUTLINE} alt="avatar" />
                            <span className="font-medium dark:text-white">
                                {value.ten}
                            </span>
                        </div>
                    )
                })
            }
        </>
    );
}

export default UserLeaderTab;