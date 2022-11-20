import { List, Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { dataListAccount } from '../../../../../components/Array_List/arrList';
import { API_GET_LIST_ACCOUNT_POSITION } from '../../../../../api/index';
import './StatisticalAccount.scss';
import axios from 'axios';
export default function ManageAccountBan() {
    const [stateGiamDoc , setGiamDoc] = useState(0);
    const [statePhoGiamDoc , setPhoGiamDoc] = useState(0);
    const [stateQuanLy , setQuanLy] = useState(0);
    const [stateTruongPhong , setTruongPhong] = useState(0);
    const [statePhoPhong , setPhoPhong] = useState(0);
    const [stateKeToan , setKeToan] = useState(0);
    const [stateNhanSu , setNhanSu] = useState(0);
    const [stateNhanVien , setNhanVien] = useState(0);
    const [stateKhac , setKhac] = useState(0);
    const giamdoc = () => {
        axios.post(API_GET_LIST_ACCOUNT_POSITION, {position : 'Giám đốc'})
            .then(res => {
                setGiamDoc(res.data.length)
            })
            .catch(error => console.log(error));
    }
    const phogiamdoc = () => {
        axios.post(API_GET_LIST_ACCOUNT_POSITION, {position : 'Phó giám đốc'})
            .then(res => {
                setPhoGiamDoc(res.data.length)
            })
            .catch(error => console.log(error));
    }
    const quanly = () => {
        axios.post(API_GET_LIST_ACCOUNT_POSITION, {position : 'Quản lý'})
            .then(res => {
                setQuanLy(res.data.length)
            })
            .catch(error => console.log(error));
    }
    const truongphong = () => {
        axios.post(API_GET_LIST_ACCOUNT_POSITION, {position : 'Trưởng phòng'})
            .then(res => {
                setTruongPhong(res.data.length)
            })
            .catch(error => console.log(error));
    }
    const phophong = () => {
        axios.post(API_GET_LIST_ACCOUNT_POSITION, {position : 'Phó phòng'})
            .then(res => {
                setPhoPhong(res.data.length)
            })
            .catch(error => console.log(error));
    }
    const ketoan = () => {
        axios.post(API_GET_LIST_ACCOUNT_POSITION, {position : 'Kế Toán'})
            .then(res => {
                setKeToan(res.data.length)
            })
            .catch(error => console.log(error));
    }
    const nhansu = () => {
        axios.post(API_GET_LIST_ACCOUNT_POSITION, {position : 'Nhân sự'})
            .then(res => {
                setNhanSu(res.data.length)
            })
            .catch(error => console.log(error));
    }
    const nhanvien = () => {
        axios.post(API_GET_LIST_ACCOUNT_POSITION, {position : 'Nhân viên'})
            .then(res => {
                setNhanVien(res.data.length)
            })
            .catch(error => console.log(error));
    }
    const khac = () => {
        axios.post(API_GET_LIST_ACCOUNT_POSITION, {position : 'Khác'})
            .then(res => {
                setKhac(res.data.length)
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        giamdoc();
        ketoan();
        phophong();
        truongphong();
        quanly();
        phogiamdoc();
        khac();
        nhanvien();
        nhansu();
    }, []);
    return (
        <>
            <Breadcrumb className='label-breadcrumb'>
                <Breadcrumb.Item>Thống kê tài khoản</Breadcrumb.Item>
            </Breadcrumb>
            <div className='Bg-manageAccountStatistical'>
                <List.Item actions={[<p className='statistical_manage_account' key="list-loadmore-edit">{stateGiamDoc} tài khoản</p>]}>
                    <List.Item.Meta
                        title={<p>{dataListAccount[0].title}</p>}
                        description={dataListAccount[0].text}
                    />
                </List.Item>
                <List.Item actions={[<p className='statistical_manage_account' key="list-loadmore-edit"> {statePhoGiamDoc} tài khoản</p>]}>
                    <List.Item.Meta
                        title={<p>{dataListAccount[1].title}</p>}
                        description={dataListAccount[1].text}
                    />
                </List.Item>
                <List.Item actions={[<p className='statistical_manage_account' key="list-loadmore-edit">{stateQuanLy} tài khoản</p>]}>
                    <List.Item.Meta
                        title={<p>{dataListAccount[2].title}</p>}
                        description={dataListAccount[2].text}
                    />
                </List.Item>
                <List.Item actions={[<p className='statistical_manage_account' key="list-loadmore-edit">{stateTruongPhong} tài khoản</p>]}>
                    <List.Item.Meta
                        title={<p>{dataListAccount[3].title}</p>}
                        description={dataListAccount[3].text}
                    />
                </List.Item>
                <List.Item actions={[<p className='statistical_manage_account' key="list-loadmore-edit">{statePhoPhong} tài khoản</p>]}>
                    <List.Item.Meta
                        title={<p>{dataListAccount[4].title}</p>}
                        description={dataListAccount[4].text}
                    />
                </List.Item>
                <List.Item actions={[<p className='statistical_manage_account' key="list-loadmore-edit">{stateKeToan} tài khoản</p>]}>
                    <List.Item.Meta
                        title={<p>{dataListAccount[5].title}</p>}
                        description={dataListAccount[5].text}
                    />
                </List.Item>
                <List.Item actions={[<p className='statistical_manage_account' key="list-loadmore-edit">{stateNhanSu} tài khoản</p>]}>
                    <List.Item.Meta
                        title={<p>{dataListAccount[6].title}</p>}
                        description={dataListAccount[6].text}
                    />
                </List.Item>
                <List.Item actions={[<p className='statistical_manage_account' key="list-loadmore-edit">{stateNhanVien} tài khoản</p>]}>
                    <List.Item.Meta
                        title={<p>{dataListAccount[7].title}</p>}
                        description={dataListAccount[7].text}
                    />
                </List.Item>
                <List.Item actions={[<p className='statistical_manage_account' key="list-loadmore-edit">{stateKhac} tài khoản</p>]}>
                    <List.Item.Meta
                        title={<p>{dataListAccount[8].title}</p>}
                        description={dataListAccount[8].text}
                    />
                </List.Item>
            </div>
        </>
    );
};