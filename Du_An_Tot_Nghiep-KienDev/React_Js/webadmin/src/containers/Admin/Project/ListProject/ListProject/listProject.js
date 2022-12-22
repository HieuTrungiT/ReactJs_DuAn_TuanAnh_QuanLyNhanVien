import { Button, Tabs } from 'antd';
import './listProject.scss';
import React, { useState, useEffect, useRef } from "react";
import AddProJect from './AddProjectNew/AddProject';

import { post } from '../post'
import axios from "axios";
// import icoShowDetails from "../icons/icon_showDetail.png";
import icoShowDetails from "../../icons/icon_showDetail.png";

function ListProject() {
  const [listWorks, setListWorks] = useState([]);

  const getWorks = async () => {
    const baseurl = 'http://' + post + '/getWorks';
    const response = await axios.get(baseurl);
    setListWorks(response.data)
  }


  useEffect(() => {
    getWorks();
  }, [])

  return (
    <div className="card-container">

      <Tabs tabBarExtraContent={AddProJect()} />
      <div className="containers-page_thong_ke">

        <div className="containers">
          <p className="title-text">
            QUẢN LÝ DỰ ÁN
          </p>

          <div className='form-body'>
            <div className="thead">
              <th>Tên dự án</th>
              <th>Bắt đầu</th>
              <th>Kết thúc</th>
              <th>Nhóm</th>
              <th>Mức độ</th>
              <th>Chi tiết</th>

            </div>
            <div className="tbody">
              {listWorks.map((element) =>
                <a href={'http://localhost:3006/quan-ly-chi-tiet-bao-cao?idWork='+ element.id} style={{ textDecoration: 'none' }} >
                  <div className="tbody-element" >
                    <td style={{ textAlign: 'left' }}>{element.nameWork}</td>
                    <td style={{ textAlign: 'center' }}>{new Date(element.deadlineFrom).toDateString()}</td>
                    <td style={{ textAlign: 'center' }}>{new Date(element.deadlineTo).toDateString()}</td>
                    <td style={{ textAlign: 'center' }}>{element.group}</td>
                    <td><div style={{ backgroundColor: element.criticalLevel == 0 ? '#4F46BA' : '#FFC430' }} className='box-color_status'></div></td>
                    <td style={{ textAlign: 'center' }}><img src={icoShowDetails} /></td>
                  </div>
                </a>

              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}



export default ListProject;
