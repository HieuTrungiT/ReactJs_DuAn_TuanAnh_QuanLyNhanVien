import { Avatar, Popconfirm, List, Button, Breadcrumb } from 'antd';
import React, { useEffect, useState, useReducer } from 'react';
import { getListAccountBan, setUnAccount } from '../../../../../Reducer/InitReducer/Staff/ListStaff';
import { getLisTAccountBanReducer, UpdateUnBanUserAccount } from '../../../../../Reducer/Reducers/Staff/listStaff';
import { getListAccountbanAPI, setUnBanAccountUser } from '../../../../../Reducer/Fetch_API/getlistStaff';
import './manageAccountBan.scss';
import { API_GET_URL_IMAGE } from '../../../../../api/index';
export default function ManageAccountBan() {
    const [state, dispatch] = useReducer(getLisTAccountBanReducer, getListAccountBan);
    const [stateUnUser, dispatchUnSer] = useReducer(UpdateUnBanUserAccount, setUnAccount);
    useEffect(() => {
        getListAccountbanAPI(dispatch)
    }, [stateUnUser]);
    const confirm = (item) => {
        setUnBanAccountUser({dispatchUnSer , item})
    };

    return (
        <>
            <Breadcrumb className='label-breadcrumb'>
                <Breadcrumb.Item>Tài khoản bị khoá ({state.length} tài khoản)</Breadcrumb.Item>
            </Breadcrumb>
            <div className='Bg-manageAccountBan'>
                {state.all &&
                    <List
                        dataSource={state.all}
                        renderItem={(item) => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    avatar={<Avatar src={!item.image == "" || !item.image == '' || !item.image == null || !item.image == undefined ? API_GET_URL_IMAGE + item.image : 'https://joeschmoe.io/api/v1/random'} />}
                                    title={<p>{item.ten}</p>}
                                    description={item.email}
                                />
                                {item.lockacc === 1 ?
                                    <Popconfirm
                                        placement="topRight"
                                        title={"Bạn chắc chắc duyệt tài khoản này ?"}
                                        onConfirm={() => confirm(item)}
                                        okText="Duyệt"
                                        cancelText="Huỷ"
                                    >
                                        <Button className='duyet_manage_account'>Chưa duyệt</Button>
                                    </Popconfirm>
                                    :
                                    <Popconfirm
                                        placement="topRight"
                                        title={"Bạn chắc chắc mở khoá tài khoản này ?"}
                                        onConfirm={() => confirm(item)}
                                        okText="Mở khoá"
                                        cancelText="huỷ"
                                    >
                                        <Button className='ban_manage_account'>Bị khoá</Button>
                                    </Popconfirm>}
                            </List.Item>
                        )}
                    />
                }
            </div>
        </>
    );
};