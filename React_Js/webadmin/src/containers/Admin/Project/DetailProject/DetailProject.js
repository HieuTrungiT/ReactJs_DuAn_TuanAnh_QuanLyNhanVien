
import { Tabs } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
// import icoShowDetails from "../icons/icon_showDetail.png";
import icoShowDetails from "../../icons/icon_showDetail.png";
function DetailProject() {
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
                            <div className='annontation_element'>
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
                                <th>Số báo cáo</th>
                                <th>Báo cáo hôm nay</th>
                                <th>Trạng thái</th>
                                <th>Xem chi tiết</th>

                            </div>
                            <div className="tbody">
                                {/* {arrayListWork.filter(indexFilter => indexFilter.status == 0 || indexFilter.status == 1).map((element) => */}
                                <a href={'http://localhost:3006/quan-ly-danh-sach-bao-cao-du-an'} style={{ textDecoration: 'none' }} >
                                    <div className="tbody-element" >
                                        <td style={{ textAlign: 'left' }}>Vũ Hiếu Trung</td>
                                        <td style={{ textAlign: 'center' }}>15/10</td>
                                        <td style={{ textAlign: 'center' }}>15/10</td>
                                        <td style={{ textAlign: 'center' }}>LTMT</td>
                                        <td style={{ textAlign: 'center' }}><div className='box-color_status'></div></td>
                                        <td style={{ textAlign: 'center' }}><img src={icoShowDetails} /></td>
                                    </div>
                                </a>

                                {/* // )}  */}
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
