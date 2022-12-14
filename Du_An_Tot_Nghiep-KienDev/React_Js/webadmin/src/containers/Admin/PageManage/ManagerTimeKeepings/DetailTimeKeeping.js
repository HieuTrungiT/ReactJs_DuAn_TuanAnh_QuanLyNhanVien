import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { post } from '../../PagesAll/post'

import TextArea from 'antd/lib/input/TextArea';
function DetailTimeKeeping() {

    const [dataTimeKeepings, setDataTimeKeepings] = useState([]);
    var countCheckReloadData = 0;

    const checkData = () => {
        console.log(dataTimeKeepings.dataTimeKeeping.date);
    }

    const getTimeKeepings = async () => {
        var baseUrl = (window.location).href; // You can also use document.URL
        var idTimeKeeping = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
        const baseurl = 'http://' + post + '/getTimekeepingWhereId?idTimeKeeping=' + idTimeKeeping;
        const response = await axios.get(baseurl);
        getUserWhereId(response.data[0]);

    }
    const getUserWhereId = async (datas) => {


        const baseurl = 'http://' + post + '/getAccount?idUser=' + datas.idUser;
        const response = await axios.get(baseurl);
        var data = {
            tenUser: response.data[0].ten,
            accuracy: datas.accuracy,
            commitment: datas.commitment,
            date: datas.date,
            date_off_work_form: datas.date_off_work_form,
            date_off_work_to: datas.date_off_work_to,
            id: datas.id,
            idUser: datas.idUser,
            nameImg: datas.nameImg,
            notes: datas.notes,
            reason: datas.reason,
            status: datas.status
        }
        console.log(data);
        setDataTimeKeepings(data);

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
        <div className="containers-page_bao_cao_cong_viec">
            <div className="containers">
                <p c lassName='title-form'>B???NG B??O C??O C??NG VI???C</p>
                <div className="contai-header_status-bao_cao_cong_viec">
                    <div className='form-info-work'>
                        <div className='info-content-work'>
                            <p className='info-title'>
                                T??n nh??n vi??n
                            </p>
                            <p className='info-content'>
                                {dataTimeKeepings.tenUser}
                            </p>
                        </div>
                        <div className='info-timeOut-work'>
                            <p className='info-title-timeOut'>
                                Th???i gian (Deadline)
                            </p>
                            <p className='info-content-timeOut'>

                                {dataTimeKeepings.status == 0 ? new Date(dataTimeKeepings.date).toDateString() : new Date(dataTimeKeepings.date_off_work_form).toDateString() + " - " + new Date(dataTimeKeepings.date_off_work_to).toDateString()}
                            </p>
                        </div>
                    </div>
                    <div className='form-status-work'>
                        <div className='status-left'>

                        </div>
                        <div className='status-right'>
                            <div className='annontation_element' style={{ opacity: dataTimeKeepings.accuracy == 0 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>??ang ch???</p>
                                <div style={{ backgroundColor: '#FFC430', borderRadius: '0px' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: dataTimeKeepings.accuracy == 1 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>X??c nh???n</p>
                                <div style={{ backgroundColor: '#19B131', borderRadius: '0px' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: dataTimeKeepings.accuracy == 2 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>T??? ch???i</p>
                                <div style={{ backgroundColor: '#FF424F', borderRadius: '0px' }} className='box-color_annontation' />
                            </div>
                            <span style={{ height: '40px', width: '1px', backgroundColor: 'green', margin: '10px' }} />
                            <div className='annontation_element' style={{ opacity: dataTimeKeepings.status == 0 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>??i???m danh</p>
                                <div style={{ backgroundColor: '#19B131' }} className='box-color_annontation' />
                            </div>
                            <div className='annontation_element' style={{ opacity: dataTimeKeepings.status == 1 ? '1' : '0.3' }}>
                                <p className='content-annonttation'>Xin v???ng</p>
                                <div style={{ backgroundColor: '#FF424F' }} className='box-color_annontation' />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="contai-info-entry-bao_cao_cong_viec">


                    {
                        dataTimeKeepings.status == 0 ?
                            <>
                                <p className='title-form-report'>??i???m danh</p>
                                <div className='contai-form-input-todo-inprogress'>
                                    <div className='contai-todo'>
                                        <p className='lable-ipt-todo-report'>Ghi ch??</p>
                                        <TextArea defaultValue={"none"} value={dataTimeKeepings.notes} type="text" name="todo-work" className='ipt-todo-report' />
                                    </div>
                                    <div className='contai-inprogress'>
                                        <p className='lable-ipt-inprogress-report'>H??nh ???nh</p>
                                        {
                                            dataTimeKeepings.nameImg == "NO_NAME_FILE" ? <h3>{dataTimeKeepings.nameImg}</h3> : <img src={"http://localhost:3001/images/" + dataTimeKeepings.nameImg} />
                                        }
                                    </div>
                                </div>
                            </>

                            :
                            <>
                                <p className='title-form-report'>Xin v???ng</p>
                                <div className='contai-form-input-todo-inprogress'>
                                    <div className='contai-todo'>
                                        <p className='lable-ipt-todo-report'>L?? do</p>
                                        <TextArea defaultValue={"none"} value={dataTimeKeepings.reason} type="text" name="todo-work" className='ipt-todo-report' />
                                    </div>
                                    <div className='contai-inprogress'>
                                        <p className='lable-ipt-inprogress-report'>Cam ??oan</p>
                                        <TextArea defaultValue={"none"} value={dataTimeKeepings.commitment} type="text" name="inprogress-work" className='ipt-inprogress-report' />
                                    </div>
                                </div>
                            </>


                    }
                </div>
                {
                    dataTimeKeepings.accuracy == 0 ? <div className="contai-btn_submit-bao_cao_cong_viec">
                        <div onClick={() => refuseTimeKeepings(dataTimeKeepings.id)} style={{ color: '#FF424F' }} className='btn-submit-progress' >
                            T??? CH???I
                        </div>
                        <span className='border-line' />
                        <div onClick={() => confirmTimeKeepings(dataTimeKeepings.id)} style={{ color: '#22D03E' }} className='btn-submit-complete'>
                            X??C NH???N
                        </div>
                    </div>
                        : ""
                }


            </div>
        </div>

    );
}
export default DetailTimeKeeping;
