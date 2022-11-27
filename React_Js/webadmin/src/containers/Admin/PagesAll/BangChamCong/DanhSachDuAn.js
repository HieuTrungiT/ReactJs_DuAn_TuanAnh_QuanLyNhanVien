import React, { useState, useEffect, useRef } from "react";
import './DanhSachDuAn.css';
import Modal from '../Moldal/Modal';
import UpdateDuAn from '../Moldal/UpdateDuAn';
import iconxoa from "../icons/delete.png";
import addBtn from "../icons/btn-add.png";
import { post } from '../post'
import axios from "axios";




function DanhSachDuAn() {

  // khởi tạo list rỗng đẩy dữ liệu 
  // let { id } = useParams();
  const [listcate, setLiscate] = useState([]);
  useEffect(() => {
    getDuAn();
  }, []);
  // console.log(dataPost)
  // data Sản phẩm
  const getDuAn = async () => {
    const baseurl = 'http://' + post + '/showbangchamcong';
    const response = await axios.get(baseurl);
    setLiscate(response.data);
    // console.log(response.data);
  }



  // xóa bài đăng
  const deletePost = (id) => {
    console.log(id);
    axios.post('http://' + post + '/deletebangchamcong', { id: id })
      .then(response => {
        if (response.data == 'ok') {
          alert('xóa thành công')
          getDuAn();
        }
      });

  }
  function testbtn() {

    alert('Click Login')

  };

  return (
    <div className='body' >
      <div className='bodyTT'>
        <div className='bodyTTl'>
          <h1>Bảng Chấm Công</h1>
          <text>tên/mail</text>
        </div>
        <div className='bodyTTr'>


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
          {/* <div>
            <ul className='frmSpTD'>

              <div className='frmBoderColumDA'  >
                <p>Công Việc</p>
              </div>

              <li>
                <div className='frmBoderColum'  >
                  <p>Thứ 2</p>
                </div>
              </li>
              <li>
                <div className='frmBoderColum' >
                  <p>Thứ 3</p>
                </div>
              </li>
              <li>
                <div className='frmBoderColum' >
                  <p>Thứ 4</p>
                </div>
              </li>
              <li>
                <div className='frmBoderColum' >
                  <p>Thứ 5</p>
                </div>
              </li>
              <li>
                <div className='frmBoderColum' >
                  <p>Thứ 6</p>
                </div>
              </li>
              <li>
                <div className='frmBoderColum'  >
                  <p>Thứ 7</p>
                </div>
              </li>
              <li>
                <div className='frmBoderColum'   >
                  <p>Chủ Nhật</p>
                </div>
              </li>
              <li>
                <div className='frmBoderColum'   >
                  <p>Chức năng</p>
                </div>
              </li>
            </ul>
          </div> */}

<table class="table table-bordered table-customize table-responsive">


    <thead>
        <tr>
            <th>Các Dự Án</th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
            <th>Chủ Nhật</th>
            <th>Chủ Nhật</th>
        
 
        </tr>
    </thead>
    {listcate.filter((Listcate) =>
              Listcate.congviec.toLowerCase()
            ).map((item) =>
    <tbody>
        <tr>
           
            <td data-title="Các Dự Án">
              <p key={item.id} value={item.id}>{item.congviec} </p>
                     
              </td>
            <td data-title="Thứ 2" > 
            <p style={{float:"left"}} key={item.id} value={item.id}>{item.hoatdong}  </p>
            <Modal/>  
            
             </td>
            <td data-title="Thứ 3">   <p style={{float:"left"}} key={item.id} value={item.id}>  Chấm công thứ 3 thì hiện ở đây </p>
            <Modal/>  </td>
            <td data-title="Thứ 4">   <p style={{float:"left"}} key={item.id} value={item.id}> Chấm công thứ 4 thì hiện ở đây   </p>
            <Modal/>  </td>
            <td data-title="Thứ 5">  <p style={{float:"left"}} key={item.id} value={item.id}> Chấm công thứ 5 thì hiện ở đây  </p>
            <Modal/>  </td>
            <td data-title="Thứ 6">  <p style={{float:"left"}} key={item.id} value={item.id}> Chấm công thứ 6 thì hiện ở đây  </p>
            <Modal/>  </td>
            <td data-title="Thứ 7">   <p style={{float:"left"}} key={item.id} value={item.id}>  Chấm công thứ 7 thì hiện ở đây </p>
            <Modal/>  </td>
            <td data-title="Chủ Nhật">   <p style={{float:"left"}} key={item.id} value={item.id}> Chấm công thứ CN thì hiện ở đây  </p>
            <Modal/>  </td>
          
            
        </tr>
  
    </tbody>
         )}
</table>



<div className="chiTietBangChamCong">
<h4>Chi Tiết Bảng Chấm Công</h4>
<table class="table table-bordered table-customize table-responsive">

    <thead>
        <tr>
    
            <th>Ngày</th>
            <th>Nhân viên</th>
            <th>Công việc</th>
            <th>Vai Trò</th>
            <th>Hoạt Động</th>
            <th>Nhiệm Vụ</th>
            <th>Giờ</th>
            <th>Từ xa</th>
            <th>Duyệt</th>
            <th>Ghi chú</th>
            <th>Lý do</th>
            <th>Chức Năng</th>
 
        </tr>
    </thead>
    {listcate.filter((Listcate) =>
              Listcate.congviec.toLowerCase()
            ).map((item) =>
    <tbody>
        <tr>
    
            <td data-title="Thứ 2"> <p key={item.id} value={item.id}>{item.ngay}  </p></td>
            <td data-title="Thứ 3"> <p key={item.id} value={item.id}>{item.nhanvien}  </p></td>
            <td data-title="Thứ 4"> <p key={item.id} value={item.id}>{item.congviec}  </p></td>
            <td data-title="Thứ 5"> <p key={item.id} value={item.id}>{item.vaitro}  </p></td>
            <td data-title="Thứ 6"> <p key={item.id} value={item.id}>{item.hoatdong}  </p></td>
            <td data-title="Thứ 7"> <p key={item.id} value={item.id}>{item.nhiemvu}  </p></td>
            <td data-title="Chủ Nhật"> <p key={item.id} value={item.id}>{item.gio}  </p></td>
            <td data-title="Chức năng"> <p key={item.id} value={item.id}>{item.tuxa}  </p></td>
            <td data-title="Chức năng"> <p key={item.id} value={item.id}>{item.duyet}  </p></td>
            <td data-title="Chức năng"> <p key={item.id} value={item.id}>{item.ghichu}  </p></td>
            <td data-title="Chức năng"> <p key={item.id} value={item.id}>{item.lydo}  </p></td>
            <td data-title="Chức năng"> <p>
            <button
                     style={{width:"34px",height:"34px",float:"left",background:"  rgb(226, 223, 223)"}}
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Bạn chắc chắn muốn xóa sản phẩm : " + item.congviec + ""
                      );
                      if (confirmBox === true) {
                        deletePost(item.id);
                      }
                    }}><img src={iconxoa} /></button>
              
               <UpdateDuAn/>  </p></td>

        </tr>

 

  
    </tbody>
         )}
</table>
</div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default DanhSachDuAn;