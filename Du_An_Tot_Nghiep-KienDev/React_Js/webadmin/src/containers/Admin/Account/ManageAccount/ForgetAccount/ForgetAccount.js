import { Avatar, List, Breadcrumb, Button } from 'antd';
import React, { useEffect, useState, useReducer } from 'react';
import { getlistForgotPw, setDataPass } from '../../../../../Reducer/InitReducer/Staff/ListStaff';
import { ForgetAccountListGet, setResetPass } from '../../../../../Reducer/Reducers/Staff/listStaff';
import { getListAccountForgotPassword, setDataPassword, setDelDataPassword } from '../../../../../Reducer/Fetch_API/getlistStaff';
import { API_GET_URL_IMAGE_USER_OUTLINE } from '../../../../../api/index';
import moment from 'moment';
import './ForgetAccount.scss';
import { SuccessForgotPW } from '../../../../../components/Notification/Success';
import { ErrForgotPW } from '../../../../../components/Notification/Error';
export default function ManageAccountBan() {
    const [state, dispatch] = useReducer(ForgetAccountListGet, getlistForgotPw);
    const [stateResetPw, dispatchResetPw] = useReducer(setResetPass, setDataPass);
    useEffect(() => {
        getListAccountForgotPassword(dispatch)
    }, [stateResetPw]);

    const ResetPw = (value) => {
        setDataPassword({ dispatchResetPw, value });
    }
    const DelRsPass = (value) => {
        setDelDataPassword({ dispatchResetPw, value });
    }

    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
            SuccessForgotPW();
        } catch (err) {
            ErrForgotPW();
        }
    };


    return (
        <>
            <Breadcrumb className='label-breadcrumb'>
                <Breadcrumb.Item>Cấp mật khẩu</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className='Bg-ForgetAccount'
            >
                <List
                    dataSource={state.all}
                    renderItem={(item) => (
                        <List.Item key={item.email}>
                            <List.Item.Meta
                                avatar={<Avatar src={API_GET_URL_IMAGE_USER_OUTLINE} />}
                                title={<p>{item.email}</p>}
                                description={item.thoigian && moment(item.thoigian).format("YYYY-MM-DD HH:mm:ss")}
                            />
                            <div className='ForgetAccount' onClick={() => ResetPw(item.email)}>Cấp lại mật khẩu</div>
                            {item.done === "2" &&
                                <>
                                    <Button className='copyToClipBoardPw' onClick={() => copyToClipBoard(item.Passnew != "" && item.Passnew)}>
                                        Sao chép mật khẩu
                                    </Button>
                                    <div className='ForgetAccountDel' onClick={() => DelRsPass(item.email)} >Xoá</div>
                                </>
                            }
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
};