
import TextArea from 'antd/lib/input/TextArea';
function DetailReportUser (){
    return(
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
                            {/* {nameWork} */}
                        </p>
                    </div>
                    <div className='info-timeOut-work'>
                        <p className='info-title-timeOut'>
                            Thời gian (Deadline)
                        </p>
                        <p className='info-content-timeOut'>
                            {/* {timeFrom} - {timeTo} */}
                        </p>
                    </div>
                </div>
                <div className='form-status-work'>
                    <div className='status-left'>
                        <div>
                            <p className='status-title'>Hôm nay:</p>
                            {/* <p>{dateToday}</p> */}
                        </div>
                        <div>
                            <p className='status-title'>Trạng thái:</p>
                            <p style={{ color: '#19B131', fontWeight: '600' }}> Good</p>
                        </div>
                    </div>
                    <div className='status-right'>
                        <div className='annontation_element' >
                            <p className='content-annonttation'>Đang làm</p>
                            <div style={{ backgroundColor: '#A162F7' }} className='box-color_annontation' />
                        </div>
                        <div className='annontation_element' >
                            <p className='content-annonttation'>Đã xong</p>
                            <div style={{ backgroundColor: '#19B131' }} className='box-color_annontation' />
                        </div>
                        <div className='annontation_element' >
                            <p className='content-annonttation'>Đang chậm</p>
                            <div style={{ backgroundColor: '#FFC430' }} className='box-color_annontation' />
                        </div>
                        <div className='annontation_element' >
                            <p className='content-annonttation'>Fail</p>
                            <div style={{ backgroundColor: '#FF424F' }} className='box-color_annontation' />
                        </div>

                    </div>
                </div>
            </div>
            <div className="contai-info-entry-bao_cao_cong_viec">
                <p className='title-form-report'>Báo cáo công việc</p>
                <p className='lable-ipt-done-report'>Đã hoàn thành</p>
                <TextArea defaultValue={"none"} type="text" name="done-work" className='ipt-done-report' />

                <div className='contai-form-input-todo-inprogress'>
                    <div className='contai-todo'>
                        <p className='lable-ipt-todo-report'>Đang làm</p>
                        <TextArea defaultValue={"none"} type="text" name="todo-work" className='ipt-todo-report'  />
                    </div>
                    <div className='contai-inprogress'>
                        <p className='lable-ipt-inprogress-report'>Sẽ làm</p>
                        <TextArea defaultValue={"none"} type="text" name="inprogress-work" className='ipt-inprogress-report' />
                    </div>
                </div>

                <div className='contai-questions-upload'>
                    <div className='contai-questions'>
                        <p className='lable-ipt-questions-report'>Câu hỏi nếu có</p>
                        <TextArea defaultValue={"none"} type="text" name="questions-work" className='ipt-questions-report' />
                    </div>
                    <div className='contai-bnt-upload'>
                        <p className='lable-upload-file-report'>File công việc đính kèm</p>
                        <input className="content-upload-file" type="file" name="file"  />
                    </div>
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
