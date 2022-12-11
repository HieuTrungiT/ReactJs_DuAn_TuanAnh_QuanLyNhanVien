
import { Tabs } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import icoShowDetails from "../../icons/icon_showDetail.png";
import React, { useState, useEffect, useRef } from "react";
import { post } from '../post'
import axios from "axios";

function DetailProject() {

    var countCheckReloadData = 0;
    const [work, setWork] = useState({});
    const [listWorkUserTags, setListWorkUserTags] = useState([]);
    const [dateToday, setDate] = useState();
    var baseUrl = (window.location).href; // You can also use document.URL
    var idWork = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);

    const getWork = async () => {
        const baseurl = 'http://' + post + '/getWorkObjects/?idWork=' + idWork;
        const response = await axios.get(baseurl);
        var element = response.data[0];
        setWork(element);
        let date = new Date();
        var readableDate = "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ""
        setDate(readableDate)
    }

    const getWorkUserTagsWhereIdWork = async () => {
        const baseurl = 'http://' + post + '/getWorkUserTagWhereIdWork/?idWork=' + idWork;
        const response = await axios.get(baseurl);
        var userTagsWhereIdWork = response.data;
        getUser(userTagsWhereIdWork)
    }

    const getUser = async (userTagsWhereIdWork) => {
        setListWorkUserTags([]);
        userTagsWhereIdWork.map(async (elementWorkUserTag) => {
            const baseurl = 'http://' + post + '/getAccount/?idUser=' + elementWorkUserTag.idUser;
            const response = await axios.get(baseurl);
            var elementUser = response.data[0];

            var data = {
                elementWorkUserTag: elementWorkUserTag,
                elementUser: elementUser
            }
            getListReport(data)
        })

        // console.log(elementUser);
    }
    const getListReport = async (data) => {
        const baseurl = 'http://' + post + '/getWorkReportWhereIdUser/?idUser=' + data.elementWorkUserTag.idUser;
        const response = await axios.get(baseurl);
        var listReport = response.data;
        let sum = 0;
        let blCheckDateReport = false;
        listReport.map((element) => {
            sum += 1;
            var dateReport = new Date(element.dateReport);
            var dateToday = new Date();
            if (dateReport == dateToday) {
                blCheckDateReport = true;
            }
        })

        var arrWorkUser = await {
            idUser: data.elementWorkUserTag.idUser,
            idWorkUserTag: data.elementWorkUserTag.id,
            sumReport: sum,
            nameUser: data.elementUser.ten,
            position: data.elementUser.chucvu,
            reportToday: blCheckDateReport,
            status: data.elementWorkUserTag.status,
        }

        setListWorkUserTags(listWorkUserTags => [...listWorkUserTags, arrWorkUser]);
    }

    useEffect(() => {
        if (countCheckReloadData == 0) {
            getWork();
            getWorkUserTagsWhereIdWork();
            countCheckReloadData++;
        }
    }, []);
    return (
        <div className="containers-page_bao_cao_cong_viec">
            <div className="containers">
                <p className='title-form'>CHI TIẾT DỰ ÁN</p>
                <div className="contai-header_status-bao_cao_cong_viec">
                    <div className='form-info-work'>
                        <div className='info-content-work'>
                            <p className='info-title'>
                                Nội dung công việc
                            </p>
                            <p className='info-content'>
                                {work.nameWork}
                            </p>
                        </div>
                        <div className='info-timeOut-work'>
                            <p className='info-title-timeOut'>
                                Thời gian (Deadline)
                            </p>
                            <p className='info-content-timeOut'>
                                {work.deadlineFrom} - {work.deadlineTo}
                            </p>
                        </div>
                    </div>
                    <div className='form-status-work'>
                        <div className='status-left'>
                            <div>
                                <p className='status-title'>Hôm nay:</p>
                                <p>{dateToday}</p>
                            </div>
                            <div>
                                <p className='status-title'>Trạng thái:</p>
                                <p style={{ color: '#19B131', fontWeight: '600' }}> Good</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="contai-info-entry-bao_cao_cong_viec">
                    <p className='title-form-report'>Danh sách nhân viên</p>
                    <div className="card-container">




                        <div className='form-body'>
                            <div className="thead">
                                <th>Tên nhân viên</th>
                                <th>Chức vụ</th>
                                <th>Số báo cáo</th>
                                <th>Báo cáo hôm nay</th>
                                <th>Trạng thái</th>
                                <th>Xem chi tiết</th>

                            </div>
                            <div className="tbody">
                                {listWorkUserTags.map((element) =>
                                <a href={'http://localhost:3006/quan-ly-danh-sach-bao-cao-du-an?idWorkUserTag='+ element.idWorkUserTag} style={{ textDecoration: 'none' }} >
                                    <div className="tbody-element" >
                                        <td style={{ textAlign: 'left' }}>{element.nameUser}</td>
                                        <td style={{ textAlign: 'center' }}>{element.position}</td>
                                        <td style={{ textAlign: 'center' }}>{element.sumReport }</td>
                                        <td style={{ textAlign: 'center' }}>{element.reportToday ? "Success" : "Fail"}</td>
                                        <td><div style={{ backgroundColor: element.status == 0 ? '#A162F7' : element.status == 1 ? '#19B131' :  element.status == 2 ? '#FFC430' : '#FF424F' }} className='box-color_status'></div></td>
                                        <td style={{ textAlign: 'center' }}><img src={icoShowDetails} /></td>
                                    </div>
                                </a>

                                )}
                            </div>
                        </div>


                    </div>
                </div>

                <div className="contai-btn_submit-bao_cao_cong_viec">
                    <div className='btn-submit-progress' >
                        BÁO CÁO TIẾN ĐỘ
                    </div>
                    <span className='border-line' />
                    <div className='btn-submit-complete'>
                        BÁO CÁO HOÀN TẤT
                    </div>
                </div>

            </div>
        </div>
    );
};
export default DetailProject;
