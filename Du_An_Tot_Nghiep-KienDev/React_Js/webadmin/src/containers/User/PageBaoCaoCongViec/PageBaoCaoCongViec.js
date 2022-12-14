import TextArea from 'antd/lib/input/TextArea';
import './PageBaoCaoCongViec.css';
import React, { useState, useEffect, useRef } from "react";
import { post } from '../../Admin/Project/post'
import axios from "axios";

function PageBaoCaoCongViec() {
    const [arrayWork, setArrWorkUser] = useState({});
    const [nameWork, setNameWork] = useState('');
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");
    const [dateToday, setDate] = useState();
    const [nameLeader, setNameLeader] = useState("");



    const [idWork, setIdWork] = useState();
    const [idWorkUserTag, setIdWorkUserTag] = useState();
    const [workDone, setWorkDone] = useState('');
    const [workToto, setWorkTodo] = useState('');
    const [workInProgress, setWorkInProgress] = useState('');
    const [workQuestions, setWorkQuestions] = useState('');
    const [file, setFile] = useState('');
    const idUserJson = localStorage.getItem('idUser');
    const idUser = JSON.parse(idUserJson);

    const getGroups = async (listIdGroup) => {
        console.log(listIdGroup);
        for (let index = 0; index < listIdGroup.length; index++) {
            const idGroup = listIdGroup[index];
            const baseurl = 'http://' + post + '/getGroup/?idGroup=' + idGroup;
            const response = await axios.get(baseurl);
            let listIdUser = JSON.parse(response.data[0].nhanviennhom);
            for (let i = 0; i < listIdUser.length; i++) {
                const idUserElement = listIdUser[i];
                if (idUserElement == idUser) {
                    getLeaderWorkObject(JSON.parse(response.data[0].nguoiquanlyduan));
                }
            }
        }

    }
    const getLeaderWorkObject = async (idLeader) => {
        const baseurl = 'http://' + post + '/getAccount/?idUser=' + idLeader;
        const response = await axios.get(baseurl);
        console.log(response.data[0]);
        if (response.data[0] != null) {
            setNameLeader(response.data[0].ten + " / Email: " + response.data[0].email);
        }
    }

    const getWorkObjects = async () => {

        var baseUrl = (window.location).href; // You can also use document.URL
        var idWorkUserTag = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
        setIdWorkUserTag(idWorkUserTag)
        let date = new Date();
        var readableDate = "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ""
        setDate(date.toString())
        const baseurl = 'http://' + post + '/getWorkUserTag/?idWorkTag=' + idWorkUserTag;
        const response = await axios.get(baseurl);
        var element = response.data[0]
        setIdWork(element.idWork);
        const baseurlWork = 'http://' + post + '/getWorkObjects/?idWork=' + element.idWork;
        const responseWork = await axios.get(baseurlWork);

        getGroups(JSON.parse(responseWork.data[0].idGroup))
        // check validate deadline set status
        var dateDeadlinefrom = new Date(responseWork.data[0].deadlineFrom);
        var dateDeadlineTo = new Date(responseWork.data[0].deadlineTo);
        var dateToday = new Date();
        var statusCheck = 0;

        // N???u nh?? m?? ng??y th??ng n??m b???t ?????u c??ng vi???c l???n h??n ng??y hi???n t???i th?? set "??ang l??nm"
        if (dateToday.getFullYear() >= dateDeadlinefrom.getFullYear()) {
            if (dateToday.getMonth() + 1 >= dateDeadlinefrom.getMonth() + 1) {
                if (dateToday.getDate() >= dateDeadlinefrom.getDate()) {
                    // ki???u tra dateToday > dateTo n???u c?? th?? ch???m ti???n ????? qu?? ng??y
                    if (dateToday.getFullYear() <= dateDeadlineTo.getFullYear()) {
                        // ki???u tra dateToday > dateTo n???u c?? th?? ch???m ti???n ????? qu?? ng??y
                        if (dateToday.getMonth() + 1 <= dateDeadlineTo.getMonth() + 1) {
                            // ki???u tra dateToday > dateTo n???u c?? th?? ch???m ti???n ????? qu?? ng??y
                            if (dateToday.getDate() <= dateDeadlineTo.getDate()) {
                                statusCheck = element.status == 1 ? 1 : 0;
                            } else {
                                console.log(dateToday.getDate());
                                console.log(dateDeadlineTo.getDate());
                                // n???u ng??y b???t ?????u d??? ??n ch??a t???i th?? set ??ang l??m
                                console.log("Qu?? th?????i gian ng??y l??m d??? ??n");

                                statusCheck = element.status == 1 ? 1 : 2;
                            }
                        } else {
                            // n???u ng??y b???t ?????u d??? ??n ch??a t???i th?? set ??ang l??m
                            console.log("Qu?? th?????i gian th??ng l??m d??? ??n");
                            statusCheck = element.status == 1 ? 1 : 2;
                        }
                    } else {
                        // n???u ng??y b???t ?????u d??? ??n ch??a t???i th?? set ??ang l??m
                        console.log("Qu?? th???i gian n??m l??m d??? ??n");
                        statusCheck = element.status == 1 ? 1 : 2;
                    }
                } else {
                    // n???u ng??y b???t ?????u d??? ??n ch??a t???i th?? set ??ang l??m
                    console.log("Ch??a t???i ng??y l??m");
                    statusCheck = element.status == 1 ? 1 : 0;
                }
            } else {
                // N???u th??ng, b???t ?????u d??? ??n ch??a t???i th??ng th?? set ??ang l??m
                console.log("Ch??a t???i th??ng l??m");
                statusCheck = element.status == 1 ? 1 : 0;
            }
        } else {
            console.log("Ch??a t???i n??m l??m");
            // N???u n??, b???t ?????u d??? ??n ch??a t???i n??m th?? set ??ang l??m
            statusCheck = element.status == 1 ? 1 : 0;

        }

        var arrWorkUser = await {
            idWorkTagUser: element.id,
            status: element.status == 3 ? 3 : statusCheck,
            workObject: responseWork.data[0]
        }
        updateStatusRealTime(arrWorkUser);
        setNameWork(responseWork.data[0].nameWork);
        setTimeFrom(responseWork.data[0].deadlineFrom)
        setTimeTo(responseWork.data[0].deadlineTo)
        setArrWorkUser(arrWorkUser)
    }

    const updateStatusRealTime = (arrWorkUser) => {

        if (arrWorkUser.status != 1 && arrWorkUser.status != 0) {
            console.log(arrWorkUser.status);
            axios.post('http://' + post + '/updateReportWork', {
                data: {
                    idWorkTagUser: arrWorkUser.idWorkTagUser,
                    status: arrWorkUser.status,
                }
            }).then(response => {
                if (response.data = 'ok') {
                    console.log("Update successful");
                    getWorkObjects();
                }
            });
        }
    }

    const submidComplete = () => {


        if (arrayWork.status != 1) {
            if (arrayWork.status != 3) {
                if (file == "") {
                    axios.post('http://' + post + '/uploadReportWorkNoImage', {

                        data: {
                            stateReport: 1,
                            idUser: idUser,
                            idWorkUserTag: idWorkUserTag,
                            dateReport: dateToday,
                            workDone: workDone,
                            workInprogress: workInProgress,
                            workToto: workToto,
                            workQuestions: workQuestions,
                            nameFile: "NO_NAME_FILE",
                        }, file

                    }).then(response => {
                        if (response.data = 'ok') {
                            console.log("Upload successful");

                            alert("B??o c??o c??ng vi???c th??nh c??ng!")
                        }
                    });
                } else {
                    const formdata = new FormData();

                    formdata.append("file", file);
                    formdata.append("stateReport", 1);
                    formdata.append("idUser", idUser);
                    formdata.append("idWorkUserTag", idWorkUserTag);
                    formdata.append("dateReport", dateToday);
                    formdata.append("workDone", workDone);
                    formdata.append("workInprogress", workInProgress);
                    formdata.append("workToto", workToto);
                    formdata.append("workQuestions", workQuestions);


                    console.log(formdata);
                    axios.post('http://' + post + '/uploadReportImage', formdata
                    ).then(response => {
                        if (response.data = 'ok') {
                            console.log("Upload successful");

                            alert("B??o c??o c??ng vi???c th??nh c??ng!")
                        }
                    });
                }
            } else {
                alert("C??ng vi???c ???? Fail, kh??ng th??? b??o c??o, li??n h??? v???i Admin!!")
            }

        } else {
            alert("C??ng vi???c ???? xong, kh??ng th??? b??o c??o ho??n t???t!!")
        }
    }
    const submidReport = () => {

        // if (arrayWork.status != 1 && arrayWork.status != 3 ) {

        if (arrayWork.status != 1 ) {
            if (file == "") {
                axios.post('http://' + post + '/uploadReportWorkNoImage', {

                    data: {
                        stateReport: arrayWork.status,
                        idUser: idUser,
                        idWorkUserTag: idWorkUserTag,
                        dateReport: dateToday,
                        workDone: workDone,
                        workInprogress: workInProgress,
                        workToto: workToto,
                        workQuestions: workQuestions,
                        nameFile: "NO_NAME_FILE",
                    }, file

                }).then(response => {
                    if (response.data = 'ok') {
                        console.log("Upload successful");

                        alert("B??o c??o c??ng vi???c th??nh c??ng!")
                    }
                });
            } else {
                const formdata = new FormData();

                formdata.append("file", file);
                formdata.append("stateReport", arrayWork.status);
                formdata.append("idUser", idUser);
                formdata.append("idWorkUserTag", idWorkUserTag);
                formdata.append("dateReport", dateToday);
                formdata.append("workDone", workDone);
                formdata.append("workInprogress", workInProgress);
                formdata.append("workToto", workToto);
                formdata.append("workQuestions", workQuestions);


                console.log(formdata);
                axios.post('http://' + post + '/uploadReportImage', formdata
                ).then(response => {
                    if (response.data = 'ok') {
                        console.log("Upload successful");

                        alert("B??o c??o c??ng vi???c th??nh c??ng!")
                    }
                });
            }
            //


        } else {
            alert("C??ng vi???c ???? xong, kh??ng th??? b??o c??o ti???n ?????!!")
        }
    }

    const changeHandler = (event) => {
        setFile(event.target.files[0]);
    };
    useEffect(() => {
        getWorkObjects();

    }, [])
    return (
        <div className="containers-page_bao_cao_cong_viec">
            <div className="containers">
                <p c lassName='title-form'>B???NG B??O C??O C??NG VI???C</p>
                <div className="contai-header_status-bao_cao_cong_viec">
                    <div className='form-info-work'>
                        <div className='info-content-work'>
                            <p className='info-title'>
                                N???i dung c??ng vi???c
                            </p>
                            <p className='info-content'>
                                {nameWork}
                            </p>
                        </div>
                        <div className='info-timeOut-work'>
                            <p className='info-title-timeOut'>
                                Th???i gian (Deadline)
                            </p>
                            <p className='info-content-timeOut'>
                                {new Date(timeFrom).toDateString()} - {new Date(timeTo).toDateString()}
                            </p>
                        </div>
                    </div>
                    <div className='form-status-work'>
                        <div className='status-left'>
                            <div>
                                <p className='status-title'>H??m nay:</p>
                                <p>{new Date(dateToday).toLocaleString().replace(",","").replace(/:.. /," ")}</p>
                            </div>
                            <div>
                                <p className='status-title'>Qu???n l?? d??? ??n:</p>
                                <p style={{ color: '#19B131', fontWeight: '600' }}>{nameLeader}</p>
                            </div>
                        </div>
                        <div className='status-right'>
                            <div className='annontation_element' style={{ opacity: arrayWork.status == 0 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>??ang l??m</p>
                                <div style={{ backgroundColor: '#A162F7' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: arrayWork.status == 1 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>???? xong</p>
                                <div style={{ backgroundColor: '#19B131' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: arrayWork.status == 2 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>??ang ch???m</p>
                                <div style={{ backgroundColor: '#FFC430' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: arrayWork.status == 3 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>Fail</p>
                                <div style={{ backgroundColor: '#FF424F' }} className='box-color_annontation' />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="contai-info-entry-bao_cao_cong_viec">
                    <p className='title-form-report'>B??o c??o c??ng vi???c</p>
                    <p className='lable-ipt-done-report'>???? ho??n th??nh</p>
                    <TextArea defaultValue={"none"} type="text" name="done-work" className='ipt-done-report' onChange={e => setWorkDone(e.target.value)} />

                    <div className='contai-form-input-todo-inprogress'>
                        <div className='contai-todo'>
                            <p className='lable-ipt-todo-report'>??ang l??m</p>
                            <TextArea defaultValue={"none"} type="text" name="todo-work" className='ipt-todo-report' onChange={e => setWorkInProgress(e.target.value)} />
                        </div>
                        <div className='contai-inprogress'>
                            <p className='lable-ipt-inprogress-report'>S??? l??m</p>
                            <TextArea defaultValue={"none"} type="text" name="inprogress-work" className='ipt-inprogress-report' onChange={e => setWorkTodo(e.target.value)} />
                        </div>
                    </div>

                    <div className='contai-questions-upload'>
                        <div className='contai-questions'>
                            <p className='lable-ipt-questions-report'>C??u h???i n???u c??</p>
                            <TextArea defaultValue={"none"} type="text" name="questions-work" className='ipt-questions-report' onChange={e => setWorkQuestions(e.target.value)} />
                        </div>
                        <div className='contai-bnt-upload'>
                            <p className='lable-upload-file-report'>File c??ng vi???c ????nh k??m</p>
                            <input className="content-upload-file" type="file" name="file" onChange={changeHandler} />
                        </div>
                    </div>
                </div>

                <div className="contai-btn_submit-bao_cao_cong_viec">
                    <div style={{ userSelect: 'none', color: '#FFC430', opacity: arrayWork.status == 1 ? '0.5' : '1', cursor: arrayWork.status != 1 ? 'pointer' : 'no-drop' }} className='btn-submit-progress' onClick={() => submidReport()}>
                        B??O C??O TI???N ?????
                    </div>
                    <span className='border-line' />
                    <div style={{ userSelect: 'none', color: '#19B131', opacity: arrayWork.status != 1 && arrayWork.status != 3 ? '1' : '0.5', cursor: (arrayWork.status != 1 && arrayWork.status != 3 ? 'pointer' : 'no-drop') }} className='btn-submit-complete' onClick={() => submidComplete()}>
                        B??O C??O HO??N T???T
                    </div>
                </div>

            </div>
        </div>
    );
}
export default PageBaoCaoCongViec
