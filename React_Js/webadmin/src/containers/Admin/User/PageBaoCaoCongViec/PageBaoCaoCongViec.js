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



    const [idWork, setIdWork] = useState();
    const [idWorkUserTag, setIdWorkUserTag] = useState();
    const [workDone, setWorkDone] = useState('');
    const [workToto, setWorkTodo] = useState('');
    const [workInProgress, setWorkInProgress] = useState('');
    const [workQuestions, setWorkQuestions] = useState('');
    const [file, setFile] = useState('');


    const getWorkObjects = async () => {

        var baseUrl = (window.location).href; // You can also use document.URL
        var idWorkUserTag = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
        setIdWorkUserTag(idWorkUserTag)
        let date = new Date();
        var readableDate = "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ""
        setDate(readableDate)
        const baseurl = 'http://' + post + '/getWorkUserTag/?idWorkTag=' + idWorkUserTag;
        const response = await axios.get(baseurl);
        var element = response.data[0]
        setIdWork(element.idWork);
        const baseurlWork = 'http://' + post + '/getWorkObjects/?idWork=' + element.idWork;
        const responseWork = await axios.get(baseurlWork);
        // check validate deadline set status
        var dateDeadlinefrom = new Date(responseWork.data[0].deadlineFrom);
        var dateDeadlineTo = new Date(responseWork.data[0].deadlineTo);
        var dateToday = new Date();
        var statusCheck = 0;

        // Nếu như mà ngày tháng năm bắt đầu công việc lớn hơn ngày hiện tại thì set "đang lànm"
        if (dateToday.getFullYear() >= dateDeadlinefrom.getFullYear()) {
            if (dateToday.getMonth() + 1 >= dateDeadlinefrom.getMonth() + 1) {
                if (dateToday.getDate() >= dateDeadlinefrom.getDate()) {
                    // kiểu tra dateToday > dateTo nếu có thì chậm tiến độ quá ngày 
                    if (dateToday.getFullYear() <= dateDeadlineTo.getFullYear()) {
                        // kiểu tra dateToday > dateTo nếu có thì chậm tiến độ quá ngày 
                        if (dateToday.getMonth() + 1 <= dateDeadlineTo.getMonth() + 1) {
                            // kiểu tra dateToday > dateTo nếu có thì chậm tiến độ quá ngày 
                            if (dateToday.getDate() <= dateDeadlineTo.getDate()) {
                                statusCheck = element.status == 1 ? 1 : 0;
                            } else {
                                console.log(dateToday.getDate());
                                console.log(dateDeadlineTo.getDate());
                                // nếu ngày bắt đầu dự án chưa tới thì set đang làm
                                console.log("Quá thười gian ngày làm dự án");

                                statusCheck = element.status == 1 ? 1 : 2;
                            }
                        } else {
                            // nếu ngày bắt đầu dự án chưa tới thì set đang làm
                            console.log("Quá thười gian tháng làm dự án");
                            statusCheck = element.status == 1 ? 1 : 2;
                        }
                    } else {
                        // nếu ngày bắt đầu dự án chưa tới thì set đang làm
                        console.log("Quá thời gian năm làm dự án");
                        statusCheck = element.status == 1 ? 1 : 2;
                    }
                } else {
                    // nếu ngày bắt đầu dự án chưa tới thì set đang làm
                    console.log("Chưa tới ngày làm");
                    statusCheck = element.status == 1 ? 1 : 0;
                }
            } else {
                // Nếu tháng, bắt đầu dự án chưa tới tháng thì set đang làm
                console.log("Chưa tới tháng làm");
                statusCheck = element.status == 1 ? 1 : 0;
            }
        } else {
            console.log("Chưa tới năm làm");
            // Nếu nă, bắt đầu dự án chưa tới năm thì set đang làm
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
          if( arrayWork.status != 3){
            if(file == ""){
                axios.post('http://' + post + '/uploadReportWorkNoImage', {
                    
                            data: {
                                stateReport: 1,
                                idWork:idWork,
                                idWorkUserTag: idWorkUserTag,
                                dateReport: dateToday,
                                workDone: workDone,
                                workInprogress: workInProgress,
                                workToto: workToto,
                                workQuestions: workQuestions,
                                nameFile: "NO_NAME_FILE",
                            },file
            
                        }).then(response => {
                            if (response.data = 'ok') {
                                console.log("Upload successful");
                                
                            alert("Báo cáo công việc thành công!")
                            }
                        });
            }else{
                const formdata = new FormData();
            
                formdata.append("file", file);
                formdata.append("stateReport", 1);
                formdata.append("idWork",  idWork);
                formdata.append("idWorkUserTag",  idWorkUserTag);
                formdata.append("dateReport",  dateToday);
                formdata.append("workDone",  workDone);
                formdata.append("workInprogress",  workInProgress);
                formdata.append("workToto",  workToto);
                formdata.append("workQuestions",  workQuestions);


                console.log(formdata);
                axios.post('http://' + post + '/uploadReportImage', formdata
                ).then(response => {
                    if (response.data = 'ok') {
                        console.log("Upload successful");
                        
                    alert("Báo cáo công việc thành công!")
                    }
                });
            }
          }else{
            alert("Công việc đã Fail, không thể báo cáo, liên hệ với Admin!!")
          }
            
        }else{
            alert("Công việc đã xong, không thể báo cáo hoàn tất!!")
        }
    }
    const submidReport = () => {
  
 
        if (arrayWork.status != 1) {
            if(file == ""){
                axios.post('http://' + post + '/uploadReportWorkNoImage', {
                    
                            data: {
                                stateReport: arrayWork.status,
                                idWork: idWork,
                                idWorkUserTag: idWorkUserTag,
                                dateReport: dateToday,
                                workDone: workDone,
                                workInprogress: workInProgress,
                                workToto: workToto,
                                workQuestions: workQuestions,
                                nameFile: "NO_NAME_FILE",
                            },file
            
                        }).then(response => {
                            if (response.data = 'ok') {
                                console.log("Upload successful");
                                
                            alert("Báo cáo công việc thành công!")
                            }
                        });
            }else{
                const formdata = new FormData();
            
                formdata.append("file", file);
                formdata.append("stateReport",  arrayWork.status);
                formdata.append("idWork",  idWork);
                formdata.append("idWorkUserTag",  idWorkUserTag);
                formdata.append("dateReport",  dateToday);
                formdata.append("workDone",  workDone);
                formdata.append("workInprogress",  workInProgress);
                formdata.append("workToto",  workToto);
                formdata.append("workQuestions",  workQuestions);


                console.log(formdata);
                axios.post('http://' + post + '/uploadReportImage', formdata
                ).then(response => {
                    if (response.data = 'ok') {
                        console.log("Upload successful");
                        
                    alert("Báo cáo công việc thành công!")
                    }
                });
            }
        //     
            
            
        }else{
            alert("Công việc đã xong, không thể báo cáo tiến độ!!")
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
                <p className='title-form'>BẢNG BÁO CÁO CÔNG VIỆC</p>
                <div className="contai-header_status-bao_cao_cong_viec">
                    <div className='form-info-work'>
                        <div className='info-content-work'>
                            <p className='info-title'>
                                Nội dung công việc
                            </p>
                            <p className='info-content'>
                                {nameWork}
                            </p>
                        </div>
                        <div className='info-timeOut-work'>
                            <p className='info-title-timeOut'>
                                Thời gian (Deadline)
                            </p>
                            <p className='info-content-timeOut'>
                                {timeFrom} - {timeTo}
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
                        <div className='status-right'>
                            <div className='annontation_element' style={{ opacity: arrayWork.status == 0 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>Đang làm</p>
                                <div style={{ backgroundColor: '#A162F7' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: arrayWork.status == 1 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>Đã xong</p>
                                <div style={{ backgroundColor: '#19B131' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: arrayWork.status == 2 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>Đang chậm</p>
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
                    <p className='title-form-report'>Báo cáo công việc</p>
                    <p className='lable-ipt-done-report'>Đã hoàn thành</p>
                    <TextArea defaultValue={"none"} type="text" name="done-work" className='ipt-done-report' onChange={e => setWorkDone(e.target.value)} />

                    <div className='contai-form-input-todo-inprogress'>
                        <div className='contai-todo'>
                            <p className='lable-ipt-todo-report'>Đang làm</p>
                            <TextArea defaultValue={"none"} type="text" name="todo-work" className='ipt-todo-report' onChange={e => setWorkInProgress(e.target.value)} />
                        </div>
                        <div className='contai-inprogress'>
                            <p className='lable-ipt-inprogress-report'>Sẽ làm</p>
                            <TextArea defaultValue={"none"} type="text" name="inprogress-work" className='ipt-inprogress-report' onChange={e => setWorkTodo(e.target.value)} />
                        </div>
                    </div>

                    <div className='contai-questions-upload'>
                        <div className='contai-questions'>
                            <p className='lable-ipt-questions-report'>Câu hỏi nếu có</p>
                            <TextArea defaultValue={"none"} type="text" name="questions-work" className='ipt-questions-report' onChange={e => setWorkQuestions(e.target.value)} />
                        </div>
                        <div className='contai-bnt-upload'>
                            <p className='lable-upload-file-report'>File công việc đính kèm</p>
                            <input className="content-upload-file" type="file" name="file" onChange={changeHandler} />
                        </div>
                    </div>
                </div>

                <div className="contai-btn_submit-bao_cao_cong_viec">
                    <div style={{ userSelect:'none' ,color: '#FFC430' ,opacity:arrayWork.status == 1 ? '0.5':'1' ,cursor: arrayWork.status != 1 ?'pointer' : 'no-drop' }} className='btn-submit-progress' onClick={() => submidReport()}>
                        BÁO CÁO TIẾN ĐỘ
                    </div>
                    <span className='border-line' />
                    <div style={{userSelect:'none' ,color: '#19B131',opacity: arrayWork.status != 1 && arrayWork.status != 3 ? '1':'0.5' ,cursor: (arrayWork.status != 1 && arrayWork.status != 3 ?'pointer' : 'no-drop')  }} className='btn-submit-complete' onClick={() => submidComplete()}>
                        BÁO CÁO HOÀN TẤT
                    </div>
                </div>

            </div>
        </div>
    );
}
export default PageBaoCaoCongViec