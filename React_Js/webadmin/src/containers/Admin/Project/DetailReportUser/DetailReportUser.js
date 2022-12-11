
import TextArea from 'antd/lib/input/TextArea';
import icoShowDetails from "../../icons/icon_showDetail.png";
import React, { useState, useEffect, useRef } from "react";
import { post } from '../post'
import axios from "axios";
function DetailReportUser() {
    const [report, setRerpot] = useState({});
    var countCheckReloadData = 0;
    var baseUrl = (window.location).href; // You can also use document.URL
    var idReport = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    const getReport = async () => {
        const baseurl = 'http://' + post + '/getWorkReportWhereId/?idReport=' + idReport;
        const response = await axios.get(baseurl);
        var element = response.data[0];

        setRerpot(element);
    }
    useEffect(() => {
        if (countCheckReloadData == 0) {
            getReport();
        }
    }, []);
    return (
        <div className="containers-page_bao_cao_cong_viec">
            <div className="containers">
                <p className='title-form'>BẢNG BÁO CÁO CÔNG VIỆC</p>

                <div className="contai-info-entry-bao_cao_cong_viec">
                    <p className='title-form-report'>Báo cáo công việc</p>
                    <p className='lable-ipt-done-report'>Đã hoàn thành</p>
                    <TextArea value={report.workDone} defaultValue={"none"} type="text" name="done-work" className='ipt-done-report' />

                    <div className='contai-form-input-todo-inprogress'>
                        <div className='contai-todo'>
                            <p className='lable-ipt-todo-report'>Đang làm</p>
                            <TextArea value={report.workInprogress} defaultValue={"none"} type="text" name="todo-work" className='ipt-todo-report' />
                        </div>
                        <div className='contai-inprogress'>
                            <p className='lable-ipt-inprogress-report'>Sẽ làm</p>
                            <TextArea value={report.workToto} defaultValue={"none"} type="text" name="inprogress-work" className='ipt-inprogress-report' />
                        </div>
                    </div>

                    <div className='contai-questions-upload'>
                        <div className='contai-questions' style={{ width: "100%" }}>
                            <p className='lable-ipt-questions-report'>Câu hỏi nếu có</p>
                            <TextArea value={report.workQuestions} defaultValue={"none"} type="text" name="questions-work" className='ipt-questions-report' />
                        </div>

                    </div>
                    <div className='contai-bnt-upload'>
                        <p className='lable-upload-file-report' style={{ textAlign: "left", marginTop: "10px" }}>File công việc đính kèm</p>
                        {
                            report.nameFile == "NO_NAME_FILE" ? <h3>{report.nameFile}</h3> : <img src={"http://localhost:3001/images/" + report.nameFile} />
                        }
                    </div>
                </div>

                <div className="contai-btn_submit-bao_cao_cong_viec">
                    <div className='btn-submit-progress' >
                        BÁO CÁO TIẾN ĐỘ
                    </div>
                    <span className='border-line' />
                    <div className='btn-submit-complete' >
                        BÁO CÁO HOÀN TẤT
                    </div>
                </div>

            </div>
        </div>
    );
};
export default DetailReportUser;
