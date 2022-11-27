import React, { useState, useEffect, } from "react";
import { useForm, } from "react-hook-form";
import '../Moldal/Modal.css'
import { post } from '../post'
import axios from "axios";
import btnAdd from '../icons/btn-add.png'
// Thêm
function Modal() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [popup, setPop] = useState(false)
    const handleClickOpen = () => {
        setPop(!popup)
    }
    const closePopup = () => {
        setPop(false)
    }

    const [listcate, setLiscate] = useState([]);
    useEffect(() => {
        getAccount();
    }, []);

    const getAccount= async () => {
        const baseurl = 'http://' + post + '/showaccount';
        const response = await axios.get(baseurl);
        setLiscate(response.data);
        // console.log(response.data);
    }


    const onSubmit = data => {


        console.log(data);

        axios.post('http://' + post + '/addbangchamcong', data)
            .then(response => {

                if (response.data = 'ok') {
                    alert("thêm thành công");
                }
            });

    }

    return (
        <div className="body1">


            <button style={{ width: "10px", height: "10px", borderRadius: "7px", float: "right", background: "  rgb(226, 223, 223)", padding: "0" }} onClick={handleClickOpen}>

                <img src={btnAdd} alt={"logo"} />

            </button>
            <div>
                {
                    popup ?
                        <div className="formMain">
                            <div className="popup">
                                <div class="testbox">
                                    <div className="boderpopup">
                                        <form action="/" onSubmit={handleSubmit(onSubmit)}>
                                            <div>
                                                <div>
                                                    <h1>Thời Gian Biểu</h1>
                                                </div>


                                                {/* {listcate.filter((Listcate) =>
                                                    Listcate.ten.toLowerCase()).map((item) => */}

                                                    <div className="wrapdaynhanvien">
                                                        <div className="wrapDay">
                                                            <h8>Ngày</h8>
                                                            <text> 222</text>
                                                        </div>
                                                        <div className="wrapTenNhanVien">
                                                            <h7>Nhân Viên: </h7>
                                                            {/* <p key={item.id} value={item.id}>{item.ten} </p> */}
                                                            
                                                            </div>

                                                    </div>


                                              {/* )} */}
                                                <div class="btn-block">
                                                    <button className="btn-close" style={{ background: "red", width: "20px", height: "20px", top: "8px", marginLeft: "326px" }} onClick={closePopup} href="/"> X </button>
                                                </div>
                                            </div>


<div >

                                            {/* Tên Công Việc */}
                                            <div className="wrapTextFrmAdd">
                                                <div className='textFrmAdd'>
                                                    <h4>Tên Dự Án</h4>
                                                </div>
                                                {/* <input type="text" name="name" /> */}

                                                <input className='inputFrmAdd' placeholder='Nhập Công Việc' {...register("congviec")} />

                                            </div>
                                            {/* Vai Trò*/}
                                            <div className="wrapTextFrmAdd">

                                                <div className='textFrmAdd2'>
                                                    <h4>Vai Trò</h4>
                                                </div>
                                                <select  {...register("vaitro")} >
                                                    <option class="disabled" value="location" disabled selected>*Please Select*</option>
                                                    <option  >Quản Trị</option>
                                                    <option  >Nhà Phát Triển</option>
                                                    <option  >Thiết Kế </option>
                                                    <option  >Quản Lý dự Án</option>

                                                </select>
                                            </div>
                                            {/* Hoạt ĐỘng */}
                                            <div className="wrapTextFrmAdd">
                                                <div className='textFrmAdd3'>
                                                    <h4>Hoạt ĐỘng</h4>
                                                </div>
                                                <input className='inputFrmAdd' placeholder='Nhập Hoạt ĐỘng' {...register("hoatdong")} />
                                            </div>
                                            {/* Nhiệm Vụ*/}
                                            <div className="wrapTextFrmAdd">
                                                <div className='textFrmAdd4'>
                                                    <h4>Nhiệm Vụ</h4>
                                                </div>
                                                <input className='inputFrmAdd' placeholder='Nhập Nhiệm Vụ' {...register("nhiemvu")} />
                                            </div>
                                            {/* Thời Gian Hoàn Thành */}
                                            <div className="wrapTextFrmAdd">
                                                <div className='textFrmAdd5'>
                                                    <h4>Thời Gian</h4>
                                                </div>
                                                <div class="time-visited">
                                                    <input type="time" name="timevisited" required {...register("gio")} />
                                                    <i class="fas fa-clock"></i>
                                                </div>
                                            </div>
                                            {/* Ghi Chú */}
                                            <h4>Ghi Chú</h4>
                                            <textarea rows="5" {...register("ghichu")} ></textarea>
                                            <div className='frmBtnThem'>
                                                <input className='inputFrmAdd' type="submit" />

                                            </div>


   </div>                                     </form>
                                    </div>
                                </div>
                            </div>
                        </div> : ""
                }
            </div>
        </div>
    )
}
export default Modal;