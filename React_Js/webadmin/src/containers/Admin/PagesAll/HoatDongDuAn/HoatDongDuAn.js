import React, { useState, useEffect, useRef } from "react";
import '../DanhSachDuAn/DanhSachDuAn.css';
import Modal from '../Moldal/Modal';
import UpdateDuAn from '../Moldal/UpdateDuAn';
import iconxoa from "../icons/delete.png";
import { post } from '../post'
import axios from "axios";
import btnAdd from'../imgFormList/add1.png'

 

function HoatDongDuAn() {
 
   // khởi tạo list rỗng đẩy dữ liệu 
  // let { id } = useParams();
  const [listcate, setLiscate] = useState([]);
  useEffect(() => {
    getDuAn();
  }, []);
  // console.log(dataPost)
  // data Sản phẩm
  const getDuAn= async () => {
    const baseurl = 'http://' + post + '/showtaskmission';
    const response = await axios.get(baseurl);
    setLiscate(response.data);
    // console.log(response.data);
  }



    // xóa bài đăng
    const deletePost = (id) => {
      console.log(id);
      axios.post( 'http://' + post + '/deleteMission', { id: id })
        .then(response => {
          if (response.data == 'ok') {
            alert('xóa thành công')
            getDuAn();
          }
        });
  
    }
  function testbtn(){
 
    alert('Click Login')

};
 
  return (
    <div className='body' >
    <div className='bodyTT'>
    <div className='bodyTTl'> 
       <h1> Hoạt ĐỘng Công Việc</h1>
      <text>tên/mail</text>
      </div>
      <div className='bodyTTr'>
     <Modal/>

       
    </div>
    </div>
  
    <div className='headerbang'>

<div className="boderHeaderbang">
      <div className='BccTime'>
        <div className='BccTimeL'>
          <text> Ngày Hiện Tại</text>
        </div>
        <div className='BccTimeR'>
          <text> Ngày/Tháng/Năm</text>
        </div>

      </div>

      {/* chỉnh Form table  */}
      <div>
        <ul className='frmSpTD'>
        
            <div className='frmBoderColumDA'  >
              <p>Công Việc</p>
            </div>
       
          <li>
            <div className='frmBoderColum'  >
              <p>Nhân Viên</p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum' >
              <p>Vai Trò</p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum' >
              <p>Hoạt Động</p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum' >
              <p>Thời Gian HT</p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum' >
              <p>Duyệt</p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum'  >
              <p>ghi chú</p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum'   >
              <p>ngày</p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum'   >
              <p>Chức năng</p>
            </div>
          </li>
        </ul>
      </div>
    {/* Hiển Thị Dữ Liệu Dự Án */}
      <div>
      {listcate.filter((Listcate) =>
            Listcate.tencongviec.toLowerCase() 
          ).map((item) =>
        <ul className='frmSpTD'>
        
            <div className='frmBoderColumDA1'  >
            <p key={item.id} value={item.id}>{item.tencongviec}  </p>
            </div>

          <li>
            <div className='frmBoderColum1'  >
            <p key={item.id} value={item.id}>{item.nhanvien}  </p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum1' >
            <p key={item.id} value={item.id}>{item.vaitro}  </p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum1' >
            <p key={item.id} value={item.id}>{item.hoatdong}  </p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum1' >
            <p key={item.id} value={item.id}>{item.thoigianhoanthanh}  </p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum1' >
            <p key={item.id} value={item.id}>{item.duyet}  </p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum1'  >
            <p key={item.id} value={item.id}>{item.ghichu}  </p>
            </div>
          </li>
          <li>
            <div className='frmBoderColum1'   >
            <p key={item.id} value={item.id}>{item.date}  </p>
            </div>
          </li>
          <li>
            {/* <div className='frmBoderColum1'   >
             <div>
             <div >
               <UpdateDuAn/>
               </div>

               <div>                   
                    <button
                     className="btn-dell"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Bạn chắc chắn muốn xóa sản phẩm : " + item.tencongviec + ""
                      );
                      if (confirmBox === true) {
                        deletePost(item.id);
                      }
                    }}> xóa</button>
                    </div>
                    </div>
            </div> */}
          </li>
          

        </ul>
          )}
      </div>

    </div>
    <div>
    </div>
    </div>
  </div>
  );
}

export default HoatDongDuAn; 