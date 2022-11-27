import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import '../Moldal/Modal.css'
import { post } from '../post'
import axios from "axios";
import iconUpdate from "../icons/pen.png";
// Sửa 
function UpdateDuAn() {

    const [popup, setPop] = useState(false)
    const handleClickOpen = () => {
        setPop(!popup)
    }
    const closePopup = () => {
        setPop(false)
    }

    const api = 'http://' + post + '/viewbangchamcong';
    let history = useNavigate();
    const { idduan } = useParams();


    // const refreshPage = () => {
    //   window.location.reload();
    // }

    const [trademarkname, settrademarkname] = useState({
        tenduan: "",
        tennhanvien: "",
        ghichu: "",

    })
    const onInputChange = e => {
        settrademarkname({ ...trademarkname, [e.target.name]: e.target.value });
    };
    const { tenduan, tennhanvien, ghichu } = trademarkname;


    useEffect(() => {
        getsanpham();
    }, []);

    //code update
    const onUpDate = async e => {
        console.log(e);
        e.preventDefault();

        fetch('http://' + post + '/updateDuan', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idduan: idduan,
                tenduan: tenduan,
                tennhanvien: tennhanvien,
                ghichu: ghichu,

            })

        })
            .then((response) => {
                if (response.data === 'ok') {
                    alert("sửa thành công");
                }
            });
        console.log("Sản phẩm sửa : " + tenduan);
        history.push("/");
    };



    // lấy dữ liệu sản phẩm
    const getsanpham = async () => {
        console.log(idduan);
        const base_url = api + `layeditsanpham/${idduan}`;
        const response = await axios.get(base_url);
        console.log(response.data);
        console.log(response.data[0].tenduan);
        settrademarkname({
            update: true,
            tenduan: response.data[0].tenduan,
            tennhanvien: response.data[0].tennhanvien,
            ghichu: response.data[0].ghichu,
        })
    };




    return (
        <div className="body1">
            <div >
                <button className="btn-Update" onClick={handleClickOpen}><img src={iconUpdate} /></button>
            </div>
            <div>
                {
                    popup ?
                        <div className="formMain">
                            <div className="popup">
                                <div class="testbox">
                                    <div className="boderpopup">
                                        <form >
                                            <div>
                                                <div>
                                                    <h1>Tạo Dự Án & Phân Công</h1>
                                                </div>
                                                <div class="btn-block">
                                                    <button className="btn-close" style={{ background: "red", width: "20px", height: "20px", top: "8px", marginLeft: "326px" }} onClick={closePopup} href="/"> X </button>
                                                </div>
                                            </div>

                                            {/* Tên Công Việc */}
                                            <div className="wrapTextFrmAdd">
                                                <div className='textFrmAdd'>
                                                    <h4>Tên Dự Án</h4>
                                                </div>
                                                {/* <input type="text" name="name" /> */}

                                                <input className='inputFrmAdd' placeholder='Nhập Công Việc' />

                                            </div>
                                            {/* Chọn Nhân Viên */}
                                            <div className="wrapTextFrmAdd">

                                                <div className='textFrmAdd2'>
                                                    <h4>Chọn Nhân Viên </h4>
                                                </div>
                                                <select    >
                                                    <option class="disabled" value="location" disabled selected>*Please Select*</option>
                                                    <option  >Văn</option>
                                                    <option  >t Anh</option>
                                                    <option  >hướng</option>
                                                    <option  >Linh</option>
                                                    <option  >tuấn</option>
                                                </select>
                                            </div>
                                            {/* Vai Trò */}
                                            <div className="wrapTextFrmAdd">
                                                <div className='textFrmAdd3'>
                                                    <h4>Vai Trò</h4>
                                                </div>
                                                <input className='inputFrmAdd' placeholder='Nhập Vai Trò' />
                                            </div>
                                            {/* Hoạt ĐỘng*/}
                                            <div className="wrapTextFrmAdd">
                                                <div className='textFrmAdd4'>
                                                    <h4>Hoạt ĐỘng</h4>
                                                </div>
                                                <input className='inputFrmAdd' placeholder='Nhập Hoạt Động' />
                                            </div>
                                            {/* Thời Gian Hoàn Thành */}
                                            <div className="wrapTextFrmAdd">
                                                <div className='textFrmAdd5'>
                                                    <h4>Thời Gian</h4>
                                                </div>
                                                <div class="time-visited">
                                                    <input type="time" name="timevisited" />
                                                    <i class="fas fa-clock"></i>
                                                </div>
                                            </div>
                                            {/* Ghi Chú */}
                                            <h4>Note</h4>
                                            <textarea rows="5" ></textarea>
                                            <div className='frmBtnThem'>
                                                <input className='inputFrmAdd' type="submit" />

                                            </div>
                                            <div>
                                                {/* <input className='inputFrmAdd' type="submit" /> */}
                                                <button onClick={onUpDate} style={{ width: '70%', height: '50px', marginBottom: '1%', marginTop: "20px", background: "#00ffff" }}>Cật Nhật</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div> : ""
                }
            </div>
        </div>
    )
}
export default UpdateDuAn;