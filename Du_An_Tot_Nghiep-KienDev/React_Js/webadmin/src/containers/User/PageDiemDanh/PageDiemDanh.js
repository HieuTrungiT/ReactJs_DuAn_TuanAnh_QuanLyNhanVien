import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect, useRef } from "react";
import './PageDiemDanh.css';
import icoDate from "../icons/ico_date.png";
import iconUpload from "../icons/ico_upload.png";
import { post } from '../../Admin/Project/post'
import axios from "axios";
// import DatePicker from 'react-datepicker';
import Alert from 'react-bootstrap/Alert';

function PageDiemDanh() {
    const [dateToday, setDate] = useState();
    const [hoursNow, setHoursNow] = useState();
    const [timeOut, setTimeOut] = useState(0); // set giá trị thời gian tan ca
    const [checkOut, setCheckOut] = useState(true);
    const [blNotOffDay, setBlNotOffDay] = useState(true);
    const [dateOffWorkTo, setDateOffWorkTo] = useState(null);
    const [dateOffWorkFrom, setDateOffWorkFrom] = useState(null);
    const [notes, setNotes] = useState("");
    const [commitment, setConmitment] = useState("");
    const [reason, setReason] = useState("");
    const [mediaFile, setMediaFile] = useState();
    const [listTimekeeping, setListTimekeeping] = useState([]);
    const [contentAlert, setContentAlert] = useState("");
    const [variantAlert, setVariantAlert] = useState('success');
    const [isShowAlert, setIsCheckShowAlert] = useState(false)
    const idUserJson = localStorage.getItem('idUser');
    const idUser = JSON.parse(idUserJson);
console.log(idUser);


    // Form điểm danh
    const getDateToday = () => {

        let date = new Date();
        var readableDate = "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ""
        console.log(date);
        setDate(readableDate)
        setDateOffWorkTo(readableDate)
        setDateOffWorkFrom(readableDate)
        setHoursNow(date.getHours())
    }
    const submitFormTimekeeping = () => {

        let day = new Date().getDay();
        setTimeout(function () {
            if (day >= 2) {
                if (hoursNow >= timeOut && hoursNow <= timeOut + 1) {
                    if (blNotOffDay) {
                        if (checkOut) {

                            if (mediaFile == null) {
                                console.log(idUser);
                                axios.post('http://' + post + '/uploadTimekeepingNoImage', { data: { idUser:idUser,dateToday: dateToday, notes: notes, nameFile: "NO_NAME_FILE" } })
                                    .then(response => {
                                        if (response.data = 'ok') {
                                            getDateToday()
                                            getTimekeeping()
                                            setIsCheckShowAlert(true);
                                            setContentAlert("Điểm danh thành công")
                                            setVariantAlert('success');
                                            setHiddenAlert()
                                            setCheckOut(false);
                                        }
                                    });
                            } else {
                                const formdata = new FormData();

                                formdata.append("file", mediaFile);
                                formdata.append("dateToday", dateToday);
                                formdata.append("notes", notes);
                                formdata.append("idUser", idUser);


                                axios.post('http://' + post + '/uploadTimekeepingImage', formdata)
                                    .then(response => {
                                        if (response.data = 'ok') {
                                            getDateToday()
                                            getTimekeeping()
                                            setIsCheckShowAlert(true);
                                            setContentAlert("Điểm danh thành công")
                                            setVariantAlert('success');
                                            setHiddenAlert()
                                            setCheckOut(false);
                                        }
                                    });
                            }



                        } else {
                            setIsCheckShowAlert(true);
                            setContentAlert("Bạn đã điểm danh hôm nay!")
                            setVariantAlert('warning');
                            setHiddenAlert()
                        }
                    } else {
                        setIsCheckShowAlert(true);
                        setContentAlert("Trạng thái đang trong ngày nghỉ vui lòng kiểm tra lại")
                        setVariantAlert('danger');
                        setHiddenAlert()
                    }
                } else {
                    setIsCheckShowAlert(true);
                    setContentAlert("Chưa đến giờ điểm danh vui lòng quay lại sau")
                    setVariantAlert('danger');
                    setHiddenAlert()
                }

            } else {
                setIsCheckShowAlert(true);
                setContentAlert("Thao tác không hợp lệ với ngày làm việc.")
                setVariantAlert('danger');
                setHiddenAlert()
            }
        }, 1000);
    }
    const changeHandler = (event) => {
        setMediaFile(event.target.files[0]);
    };
    const confirmForm = () => {
        let text = "Bạn có muốn xác nhận xin vắng?";
        if (window.confirm(text) == true) {
            text = "Đồng ý";
            submitOffWork();
            setDateOffWorkTo(null);
            setDateOffWorkFrom(null);
            setConmitment(null);
            setReason(null);
        } else {
            text = "Hủy!";
            setDateOffWorkTo(null);
            setDateOffWorkFrom(null);
            setConmitment(null);
            setReason(null);
        }
    }
    // Form xin vắng
    const submitOffWork = () => {
        // validate
        var dateNow = new Date();
        var dateOffTo = new Date(dateOffWorkTo);
        var dateOrrFrom = new Date(dateOffWorkFrom);
        console.log(dateOffWorkTo);
        if (dateOffWorkTo != null) {
            if (dateOffTo.getFullYear() >= dateNow.getFullYear()) {
                if ((dateOffTo.getMonth() + 1) >= (dateNow.getMonth() + 1)) {
                    if (dateOffTo.getDate() >= dateNow.getDate()) {
                        if (dateOffWorkFrom != null) {
                            if (dateOrrFrom.getFullYear() >= dateOffTo.getFullYear()) {
                                if ((dateOrrFrom.getMonth() + 1) >= (dateOffTo.getMonth() + 1)) {
                                    if (dateOrrFrom.getDate() >= dateOffTo.getDate()) {
                                        if (commitment != "") {
                                            if (reason != "") {
                                                axios.post('http://' + post + '/uploadOffWork', { data: { idUser: idUser, dateTo: dateOffWorkTo, dateFrom: dateOffWorkFrom == null || dateOffWorkFrom == "" ? dateOffWorkTo : dateOffWorkFrom, commitment: commitment, reason: reason } })
                                                    .then(response => {
                                                        if (response.data = 'ok') {
                                                            getDateToday()
                                                            getTimekeeping()
                                                            setIsCheckShowAlert(true);
                                                            setContentAlert("Nộp đơn xin nghỉ thành công")
                                                            setVariantAlert('warning');
                                                            setHiddenAlert()
                                                        }
                                                    });
                                            } else {
                                                setIsCheckShowAlert(true);
                                                setContentAlert("Lý do không được bỏ trống")
                                                setVariantAlert('danger');
                                                setHiddenAlert()
                                            }
                                        } else {
                                            setIsCheckShowAlert(true);
                                            setContentAlert("Cam đoan không được bỏ trống")
                                            setVariantAlert('danger');
                                            setHiddenAlert()
                                        }
                                    } else {
                                        setIsCheckShowAlert(true);
                                        setContentAlert("Ngày đến không được nhỏ hơn ngày bắt đầu nghỉ")
                                        setVariantAlert('danger');
                                        setHiddenAlert()
                                    }
                                } else {
                                    setIsCheckShowAlert(true);
                                    setContentAlert("Tháng đến không được nhỏ hơn tháng bắt đầu nghỉ")
                                    setVariantAlert('danger');
                                    setHiddenAlert()

                                }
                            } else {
                                setIsCheckShowAlert(true);
                                setContentAlert("Năm đến không được nhỏ hơn năm từ")
                                setVariantAlert('danger');
                                setHiddenAlert()
                            }
                        } else {
                            if (commitment != "") {
                                if (reason != "") {
                                    axios.post('http://' + post + '/uploadOffWork', { data: { idUser: idUser, dateTo: dateOffWorkTo, dateFrom: dateOffWorkFrom == null || dateOffWorkFrom == "" ? dateOffWorkTo : dateOffWorkFrom, commitment: commitment, reason: reason } })
                                        .then(response => {
                                            if (response.data = 'ok') {
                                                getDateToday()
                                                getTimekeeping()
                                                setIsCheckShowAlert(true);
                                                setContentAlert("Nộp đơn xin nghỉ thành công")
                                                setVariantAlert('warning');
                                                setHiddenAlert()
                                            }
                                        });

                                } else {
                                    setIsCheckShowAlert(true);
                                    setContentAlert("Lý do không được bỏ trống")
                                    setVariantAlert('danger');
                                    setHiddenAlert()
                                }
                            } else {
                                setIsCheckShowAlert(true);
                                setContentAlert("Cam đoan  không được bỏ trống")
                                setVariantAlert('danger');
                                setHiddenAlert()
                            }
                        }
                    } else {
                        setIsCheckShowAlert(true);
                        setContentAlert("Ngày không được nhỏ hơn ngày hiện tại")
                        setVariantAlert('danger');
                        setHiddenAlert()
                    }
                } else {
                    setIsCheckShowAlert(true);
                    setContentAlert("Tháng không được nhỏ hơn tháng hiện tại")
                    setVariantAlert('danger');
                    setHiddenAlert()
                }
            } else {
                setIsCheckShowAlert(true);
                setContentAlert("Năm không được nhỏ hơn năm hiện tại")
                setVariantAlert('danger');
                setHiddenAlert()
            }
        } else {
            setIsCheckShowAlert(true);
            setContentAlert("Vui lòng chọn ngày nghỉ")
            setVariantAlert('danger');
            setHiddenAlert()
        }

    }

    // Form table bảng công
    const getTimekeeping = async () => {
        const baseurl = 'http://' + post + '/getTimekeeping/?idUser=' + idUser;
        const response = await axios.get(baseurl);
        console.log(response);
        setListTimekeeping(response.data)

        response.data.map((item) => {
            var dateItem = new Date(item.date);

            var dateElement = dateItem.getDate();
            var monthElement = dateItem.getMonth();
            var yearElement = dateItem.getFullYear();

            var dateNow = new Date().getDate();
            var monthNow = new Date().getMonth();
            var yearNow = new Date().getFullYear();

            // Check điểm danh một lần trong ngày
            if (yearElement <= yearNow) {
                if ((monthElement + 1) <= (monthNow + 1)) {
                    if (dateElement == dateNow) {
                        setCheckOut(false);

                    }
                }
            }

            // Check ngày hiện tại có trong ngày đã xin nghỉ chặn điện danh nếu có
            var dateOffTo = new Date(item.date_off_work_to);
            var dateOffFrom = new Date(item.date_off_work_form);
            console.log(dateOffTo.getMonth());
            console.log(monthNow + 1);
            if (yearNow >= dateOffTo.getFullYear() && yearNow <= dateOffFrom.getFullYear()) {
                if (monthNow >= dateOffTo.getMonth() && monthNow <= dateOffFrom.getMonth()) {
                    if (dateNow >= dateOffTo.getDate() && dateNow <= dateOffFrom.getDate()) {
                        setCheckOut(false);
                        setBlNotOffDay(false);
                        console.log("Trong ngày nghỉ");
                    }
                }
            }
        })

    }
    const setHiddenAlert = () => {
        setTimeout(function () {
            setIsCheckShowAlert(false);
        }, 2000);

    }
    useEffect(() => {
        getDateToday()
        getTimekeeping()
    }, []);

    return (
        <div className="containers-page_diem_danh">
            <Alert className="alert" style={{ display: isShowAlert ? "block" : "none" }} key={variantAlert} variant={variantAlert}>
                {contentAlert}
            </Alert>
            <div className="containers">

                <div className="container-formDiemDanh">
                    <p className="title-text">
                        ĐIỂM DANH
                    </p>
                    <div className="formDiemDanh">
                        <div className="header-formDiemDanh">
                            <div className="header-left">
                                Điểm danh hôm nay
                            </div>
                            <div className="header-right">
                                <p>{hoursNow >= timeOut && hoursNow <= timeOut + 1 ? checkOut ? "Có thể điểm danh" : blNotOffDay ? "Đã điểm danh" : "Ngày xin vắng" : "Chưa được điểm danh"}</p>
                                <div style={{ backgroundColor: hoursNow >= timeOut && hoursNow <= timeOut + 1 ? checkOut ? '#00FF28' : '#FFC430' : '#FF424F' }} className="status-diemDanh"> </div>
                            </div>
                        </div>
                        <div className="content-formDiemDanh">
                            <div className="content-leftInfo">
                                <div className="content-date">
                                    <img src={icoDate} /> {dateToday}
                                </div>

                                <input className="content-uploadImage" type="file" name="file" onChange={changeHandler} accept="image/png, image/jpeg" />


                            </div>
                            <div className="content-rightIpt">
                                <TextArea id="ipt-ghiChuDiemDanh" name="ghiChuDiemDanh" rows="4" cols="20" defaultValue={"Ghi chú nếu có."} onChange={e => setNotes(e.target.value)} />
                            </div>
                            <button style={{ opacity: hoursNow >= timeOut && hoursNow <= timeOut + 1 && new Date().getDay() >= 2 && checkOut ? '1' : '0.5', cursor: hoursNow >= timeOut && hoursNow <= timeOut + 1 && checkOut ? 'pointer' : 'no-drop' }} className="content-btnDiemDanh" onClick={submitFormTimekeeping}>
                                ĐIỂM DANH
                            </button>
                        </div>

                    </div>
                </div>
                <div className="container-formXinVang">
                    <div className="formXinVangInfo">
                        <div className="content-left">
                            <div className="content-headerInfo">
                                Xin vắng
                                <div className="content-contai-date">

                                    <div className="content-date">
                                        Từ:
                                        <input className="content-dateTo" defaultValue={dateToday} type="date" id="birthday" name="birthday" onChange={e => setDateOffWorkTo(e.target.value)} />
                                    </div>
                                    <div className="content-date">
                                        Đến hết:
                                        <input className="content-dateFrom" defaultValue={dateToday} type="date" id="birthday" name="birthday" onChange={e => setDateOffWorkFrom(e.target.value)} />
                                    </div>
                                </div>


                            </div>
                            <TextArea className="ipt-banCamDoan" id="ipt-banCamDoan" name="banCamDoan" rows="4" cols="20" defaultValue={"Cam đoan."} onChange={e => setConmitment(e.target.value)} />
                        </div>
                        <TextArea className="ipt-banLyDo" id="ipt-banLyDo" name="banLyDo" rows="4" cols="20" defaultValue={"Lý do"} onChange={e => setReason(e.target.value)} />
                    </div>
                    <button className="btn-formXinVang" onClick={confirmForm} >
                        XIN VẮNG
                    </button>


                </div>
                <div className="container-formBangCong">
                    <p className="title-text">
                        BẢNG CÔNG
                    </p>
                    <div className="formBangCong">
                        <div className="thead">
                            <th>Thời gian</th>
                            <th>Trạng thái</th>
                            <th>Xác nhận</th>
                        </div>
                        <div className="tbody">
                            {listTimekeeping.map((item) =>
                                <div className="tbody-element">
                                    <td >{item.date == null || item.date == "" ? item.date_off_work_to == item.date_off_work_form ? item.date_off_work_to : item.date_off_work_to + " đến " + item.date_off_work_form : item.date}</td>

                                    {item.status == 0 ? <td className="status_OK">Điểm danh</td> : <td className="status_Fail">Xin vắng</td>}

                                    {item.accuracy == 0 ? <td className="accuracy_Waiting">Đang chờ</td> : item.accuracy == 1 ? <td className="accuracy_Confirm">Đã xác nhận</td> : <td style={{ color: '#FD4438' }}>Từ chối</td>}

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PageDiemDanh;
