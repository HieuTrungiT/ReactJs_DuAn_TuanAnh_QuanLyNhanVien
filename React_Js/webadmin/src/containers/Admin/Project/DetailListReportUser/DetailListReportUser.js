import icoShowDetails from "../../icons/icon_showDetail.png";
import React, { useState, useEffect, useRef } from "react";
import { post } from '../post'
import axios from "axios";
function DetailListReportUser() {
    var countCheckReloadData = 0;
    const [arrayListDataWorkUserReport, setArrayListDataWorkUserReport] = useState([]);
    const [dateToday, setDate] = useState();
    const [work, setWork] = useState({});
    const [status, setStatus] = useState();
    const [nameLeader, setNameLeader] = useState("");
    const [nameUser, setNameUser] = useState("");

    var baseUrl = (window.location).href; // You can also use document.URL
    var idWorkUserTag = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    const getWorkUserTag = async () => {
        const baseurl = 'http://' + post + '/getWorkUserTag/?idWorkTag=' + idWorkUserTag;
        const response = await axios.get(baseurl);
        var element = response.data[0];

        getUser(element)
        getWork(element)
    }
    const confirmStopWork = () => {
        let text = "Xác dừng tiến độ của nhân viên này?";
        if (window.confirm(text) == true) {
            text = "Đồng ý";
            SetStateWorkUserTag(3);
            window.location.href = 'http://localhost:3006/quan-ly-danh-sach-bao-cao-du-an?idWorkUserTag=' + idWorkUserTag;
        } else {
            text = "Hủy!";
        }
    }
    const confirmContinueWork = () => {
        let text = "Xác gia hạn tiến độ của nhân viên này?";
        if (window.confirm(text) == true) {
            text = "Đồng ý";
            SetStateWorkUserTag(0);
            window.location.href = 'http://localhost:3006/quan-ly-danh-sach-bao-cao-du-an?idWorkUserTag=' + idWorkUserTag;
        } else {
            text = "Hủy!";
        }
    }
    const SetStateWorkUserTag = async (int) => {
        axios.post('http://' + post + '/UpdateStateUserTag', {

        data: {
            idUserTag: idWorkUserTag,
            State: int,
        }

    }).then(response => {
        if (response.data = 'ok') {
            console.log("Upload successful");
        }
    });


    }

    const getWork = async (elm) => {
        const baseurl = 'http://' + post + '/getWorkObjects/?idWork=' + elm.idWork;
        const response = await axios.get(baseurl);
        var element = response.data[0];
        let Data = {
            idUser: elm.idUser,
            idGroup: JSON.parse(element.idGroup)
        }
        getGroups(Data)
        setWork(element);
        let date = new Date();
        var readableDate = "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ""
        setDate(readableDate)
    }
    const getGroups = async (data) => {


        for (let index = 0; index < data.idGroup.length; index++) {
            const idGroup = data.idGroup[index];
            const baseurl = 'http://' + post + '/getGroup/?idGroup=' + idGroup;
            const response = await axios.get(baseurl);
            let listIdUser = JSON.parse(response.data[0].nhanviennhom);
            for (let i = 0; i < listIdUser.length; i++) {
                const idUserElement = listIdUser[i];

                if (idUserElement == data.idUser) {
                    getLeaderWorkObject(JSON.parse(response.data[0].nguoiquanlyduan));
                }
            }
        }

    }
    const getLeaderWorkObject = async (idLeader) => {
        console.log(idLeader);
        const baseurl = 'http://' + post + '/getAccount/?idUser=' + idLeader;
        const response = await axios.get(baseurl);
        console.log(response.data[0]);
        if (response.data[0] != null) {
            setNameLeader(response.data[0].ten + " / Email: " + response.data[0].email);
        }
    }
    const getUser = async (elementWorkUserTag) => {
        const baseurl = 'http://' + post + '/getAccount/?idUser=' + elementWorkUserTag.idUser;
        const response = await axios.get(baseurl);
        var element = response.data[0];
        setNameUser(element.ten)
        var data = {
            dataUser: element,
            dataWorkUserTag: elementWorkUserTag
        }
        getReports(data);
    }
    const getReports = async (data) => {
        const baseurl = 'http://' + post + '/getWorkReportWhereIdUser/?idUser=' + data.dataUser.id;
        const response = await axios.get(baseurl);
        var element = response.data;
        setArrayListDataWorkUserReport([]);
        element.map(async (item) => {
            var arrayDataReport = await {
                idReport: item.id,
                nameUser: data.dataUser.ten,
                position: data.dataUser.chucvu,
                timeReport: item.dateReport,
                fileNameReport: item.nameFile,
                status: data.dataWorkUserTag.status,
            }
            setStatus(data.dataWorkUserTag.status)

            setArrayListDataWorkUserReport(arrayListDataWorkUserReport => [...arrayListDataWorkUserReport, arrayDataReport])
        })

    }
    useEffect(() => {
        if (countCheckReloadData == 0) {
            getWorkUserTag();
        }
    }, []);
    return (
        <div className="containers-page_bao_cao_cong_viec">
            <div className="containers">
                <p className='title-form'>QUẢN LÝ BÁO CÁO NHÂN VIÊN</p>
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
                                {new Date(work.deadlineFrom).toDateString()} - {new Date(work.deadlineTo).toDateString()}
                            </p>
                        </div>
                    </div>
                    <div className='form-status-work'>
                        <div className='status-left'>
                            <div>
                                <p className='status-title'>Tên nhân viên:</p>
                                <p>{nameUser}</p>
                            </div>
                            <div>
                                <p className='status-title'>Quản lý dự án:</p>
                                <p style={{ color: '#19B131', fontWeight: '600' }}> {nameLeader}</p>
                            </div>
                        </div>
                        <div className='status-right'>
                            <div className='annontation_element' style={{ opacity: status == 0 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>Đang làm</p>
                                <div style={{ backgroundColor: '#A162F7' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: status == 1 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>Đã xong</p>
                                <div style={{ backgroundColor: '#19B131' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: status == 2 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>Đang chậm</p>
                                <div style={{ backgroundColor: '#FFC430' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: status == 3 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>Fail</p>
                                <div style={{ backgroundColor: '#FF424F' }} className='box-color_annontation' />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="contai-info-entry-bao_cao_cong_viec">
                    <p className='title-form-report'>Báo cáo công việc</p>
                    <div className="card-container">




                        <div className='form-body'>
                            <div className="thead">
                                <th>Tên nhân viên</th>
                                <th>Chức vụ</th>
                                <th>TG báo cáo</th>
                                <th>File báo cáo</th>
                                <th>Trạng thái</th>
                                <th>Xem chi tiết</th>

                            </div>
                            <div className="tbody">
                                {arrayListDataWorkUserReport.map((element) =>
                                    <a href={'http://localhost:3006/quan-ly-bao-cao-nhan-vien?idReport=' + element.idReport} style={{ textDecoration: 'none' }} >
                                        <div className="tbody-element" >
                                            <td style={{ textAlign: 'left' }}>{element.nameUser}</td>
                                            <td style={{ textAlign: 'center' }}>{element.position}</td>
                                            <td style={{ textAlign: 'center' }}>{new Date(element.timeReport).toLocaleString().replace(",", "").replace(/:.. /, " ")}</td>
                                            <td style={{ textAlign: 'center' }}>{element.fileNameReport}</td>
                                            <td style={{ textAlign: 'center' }}><div className='box-color_status'></div></td>
                                            <td style={{ textAlign: 'center' }}><img src={icoShowDetails} /></td>
                                        </div>
                                    </a>

                                )}
                            </div>
                        </div>


                    </div>
                </div>

                <div className="contai-btn_submit-bao_cao_cong_viec">

                    <div onClick={() => confirmStopWork()} style={{ borderRadius: '5px', backgroundColor: '#FD4438', color: "#ffff", opacity: status == 3 ? '0.3' : '1' }}>
                        DỪNG TIẾN ĐỘ
                    </div>
                    <span className='border-line' />
                    <div onClick={() => confirmContinueWork()} style={{ borderRadius: '5px', backgroundColor: '#19B131', color: "#ffff", opacity: status == 3 ? '1' : '0.3' }}>
                        GIA HẠN
                    </div>
                </div>

            </div>
        </div>
    );
};
export default DetailListReportUser;
