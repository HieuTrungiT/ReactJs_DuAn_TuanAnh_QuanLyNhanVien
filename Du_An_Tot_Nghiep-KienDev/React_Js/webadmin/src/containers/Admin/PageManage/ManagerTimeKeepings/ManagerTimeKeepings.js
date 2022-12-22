import { Button, Tabs } from 'antd';
import './ManagerTimeKeeping.css';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { post } from '../../PagesAll/post'

// import icoShowDetails from "../icons/icon_showDetail.png";
import icoShowDetails from "../../icons/icon_showDetail.png";
function ManagerTimeKeepings() {
    const [dataTimeKeepings, setDataTimeKeepings] = useState([]);
    var countCheckReloadData = 0;

    const checkData = () => {
        console.log(dataTimeKeepings);
    }

    const getTimeKeepings = async () => {
        const baseurl = 'http://' + post + '/getAllTimekeeping';
        const response = await axios.get(baseurl);
        getUserWhereId(response.data);

    }
    const getUserWhereId = async (datas) => {
        setDataTimeKeepings([]);
        datas.map(async (element) => {
            const baseurl = 'http://' + post + '/getAccount?idUser=' + element.idUser;
            const response = await axios.get(baseurl);
            var data = {
                tenUser: response.data[0].ten,
                dataTimeKeepings: element
            }
            setDataTimeKeepings(dataTimeKeepings => [...dataTimeKeepings, data]);
        })
    }

    const confirmTimeKeepings = (id) => {
        console.log(id);
        axios.post('http://' + post + '/confirmTimeKeepings', {
            data: {
                id: id,
                accuracy: 1,
            }
        }).then(response => {
            if (response.data = 'ok') {
                console.log("Update successful");
                getTimeKeepings();
            }
        });
    }
    const refuseTimeKeepings = (id) => {
        axios.post('http://' + post + '/confirmTimeKeepings', {
            data: {
                id: id,
                accuracy: 2,
            }
        }).then(response => {
            if (response.data = 'ok') {
                console.log("Update successful");
                getTimeKeepings();
            }
        });
    }

    useEffect(() => {
        if (countCheckReloadData == 0) {
            getTimeKeepings();
            countCheckReloadData += 1;
        }
    }, [])
    return (
        <div className="card-container">

            <div className="containers-page_thong_ke">

                <div className="containers">
                    <p className="title-text">
                        QUẢN LÝ DANH SÁCH CHẤM CÔNG
                    </p>
                    <h4 style={{ textAlign: 'left', marginLeft: "10px", marginTop: "50px", fontWeight: 'bold', color: '#22D03E' }}>Xác nhận điểm danh</h4>
                    <div className='form-body'>
                        <div className="thead_Manager-Keepings">
                            <th>Tên Nhân viên</th>
                            <th>Thời gian</th>
                            <th>Hoạt động</th>
                            <th>Ghi chú</th>
                            <th>Trạng thái</th>
                            <th>Tùy trọn</th>
                            <th></th>
                        </div>
                        <div className="tbody">


                            {dataTimeKeepings.filter(indexFilter => indexFilter.dataTimeKeepings.status == 0 && indexFilter.dataTimeKeepings.accuracy == 0).map((element) =>
                                <div className="tbody-manager-element-Keepings" >
                                    <td>{element.tenUser}</td>
                                    <td>{element.dataTimeKeepings.date}</td>
                                    <td><div style={{ backgroundColor: '#22D03E' }} className='box-color_status'></div></td>
                                    <td>{element.dataTimeKeepings.notes}</td>
                                    <td style={{ color: '#FFC430' }}>Đang chờ</td>
                                    <td style={{display:'flex'}}>
                                        <button onClick={() => refuseTimeKeepings(element.dataTimeKeepings.id)} style={{ marginRight: "10px", backgroundColor: "#FF424F" }}>Từ chối</button>
                                        <button onClick={() => confirmTimeKeepings(element.dataTimeKeepings.id)} style={{ backgroundColor: "#22D03E" }}>Xác nhận</button>
                                    </td>
                                    <td style={{ textAlign: 'center' }} className="btn_showDetails">
                                        <a href={'http://localhost:3006/chi-tiet-cham-cong/:id=' + element.dataTimeKeepings.id} style={{ textDecoration: 'none' }} >
                                            <img src={icoShowDetails} />
                                        </a>
                                    </td>
                                </div>
                            )}
                        </div>
                    </div>
                    <h4 style={{ textAlign: 'left', marginLeft: "10px", marginTop: "50px", fontWeight: 'bold', color: '#EB001B' }}>Xác nhận xin vắng</h4>
                    <div className='form-body'>
                    <div className="thead_Manager-Keepings">
                            <th>Tên Nhân viên</th>
                            <th>Thời gian</th>
                            <th>Hoạt động</th>
                            <th>Lý do</th>
                            <th>Trạng thái</th>
                            <th>Tùy trọn</th>
                            <th></th>
                        </div>
                        <div className="tbody">
                            {dataTimeKeepings.filter(indexFilter => indexFilter.dataTimeKeepings.status == 1 && indexFilter.dataTimeKeepings.accuracy == 0).map((element) =>
                                <div className="tbody-manager-element-Keepings" >
                                    <td>{element.tenUser}</td>
                                    <td>{new Date(element.dataTimeKeepings.date_off_work_form).toDateString()} - {new Date(element.dataTimeKeepings.date_off_work_to).toDateString()}</td>

                                    <td><div style={{ backgroundColor: '#EB001B' }} className='box-color_status'></div></td>
                                    <td>{element.dataTimeKeepings.reason}</td>
                                    <td style={{ color: '#FFC430' }}>Đang chờ</td>
                                    <td>
                                        <button onClick={() => refuseTimeKeepings(element.dataTimeKeepings.id)} style={{ marginRight: "10px", backgroundColor: "#FF424F" }}>Từ chối</button>
                                        <button onClick={() => confirmTimeKeepings(element.dataTimeKeepings.id)} style={{ backgroundColor: "#22D03E" }}>Xác nhận</button>
                                    </td>
                                    <td style={{ textAlign: 'center' }} className="btn_showDetails">
                                        <a href={'http://localhost:3006/chi-tiet-cham-cong/:id=' + element.dataTimeKeepings.id} style={{ textDecoration: 'none' }} >
                                            <img src={icoShowDetails} />
                                        </a>
                                    </td>
                                </div>
                            )}
                        </div>
                    </div>
                    <h4 style={{ textAlign: 'left', marginLeft: "10px", marginTop: "50px", fontWeight: 'bold', color: '#A162F7' }}>Đã xác nhận</h4>
                    <div className='form-body'>
                        <div className="thead">
                            <th>Tên Nhân viên</th>
                            <th>Thời gian</th>
                            <th>Hoạt động</th>
                            <th>Lý do</th>
                            <th>Trạng thái</th>

                            <th></th>
                        </div>
                        <div className="tbody">
                            {dataTimeKeepings.filter(indexFilter => indexFilter.dataTimeKeepings.accuracy == 1).map((element) =>
                                <a href={'http://localhost:3006/chi-tiet-cham-cong/:id=' + element.dataTimeKeepings.id} style={{ textDecoration: 'none' }} >

                                    <div className="tbody-element" >
                                        <td>{element.tenUser}</td>

                                        <td>{element.dataTimeKeepings.status == 0 ? new Date(element.dataTimeKeepings.date).toDateString() : new Date(element.dataTimeKeepings.date_off_work_to).toDateString() + " / " + new Date(element.dataTimeKeepings.date_off_work_to).toDateString()}</td>
                                        <td><div style={{ backgroundColor: element.dataTimeKeepings.status == 0 ? '#22D03E' : "#EB001B" }} className='box-color_status'></div></td>
                                        <td>{element.dataTimeKeepings.status == 0 ? element.dataTimeKeepings.notes : element.dataTimeKeepings.reason}</td>
                                        <td style={{ color: '#22D03E' }}>Đã xác nhận</td>
                                        <td style={{ textAlign: 'center' }} className="btn_showDetails">
                                            <img src={icoShowDetails} />
                                        </td>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>

                    <h4 style={{ textAlign: 'left', marginLeft: "10px", marginTop: "50px", fontWeight: 'bold', color: '#FFC248' }}>Đã từ chối</h4>
                    <div className='form-body'>
                        <div className="thead">
                            <th>Tên Nhân viên</th>
                            <th>Thời gian</th>
                            <th>Hoạt động</th>
                            <th>Lý do</th>
                            <th>Trạng thái</th>

                            <th></th>
                        </div>
                        <div className="tbody">
                            {dataTimeKeepings.filter(indexFilter => indexFilter.dataTimeKeepings.accuracy == 2).map((element) =>
                                <a href={'http://localhost:3006/chi-tiet-cham-cong/:id=' + element.dataTimeKeepings.id} style={{ textDecoration: 'none' }} >

                                    <div className="tbody-element" >
                                        <td>{element.tenUser}</td>
                                        <td>{element.dataTimeKeepings.status == 0 ? new Date(element.dataTimeKeepings.date).toDateString() : new Date(element.dataTimeKeepings.date_off_work_to).toDateString() + " - " + new Date(element.dataTimeKeepings.date_off_work_to).toDateString()}</td>
                                        <td><div style={{ backgroundColor: element.dataTimeKeepings.status == 0 ? '#22D03E' : "#EB001B" }} className='box-color_status'></div></td>
                                        <td>{element.dataTimeKeepings.status == 0 ? element.dataTimeKeepings.notes : element.dataTimeKeepings.reason}</td>
                                        <td style={{ color: '#EB001B' }}>Không xác nhận</td>
                                        <td style={{ textAlign: 'center' }} className="btn_showDetails">
                                            <img src={icoShowDetails} />
                                        </td>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ManagerTimeKeepings;
