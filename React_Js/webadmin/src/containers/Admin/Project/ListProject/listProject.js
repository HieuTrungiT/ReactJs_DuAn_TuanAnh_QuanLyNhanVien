import { Tabs } from 'antd';
import './listProject.scss';
import AddProJect from './AddProjectNew/AddProject';
import React from 'react';
// import icoShowDetails from "../icons/icon_showDetail.png";
import icoShowDetails from "../../icons/icon_showDetail.png";

const App = () => (
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
                            <th>Trạng thái</th>

                        </div>
                        <div className="tbody">
                             {/* {arrayListWork.filter(indexFilter => indexFilter.status == 0 || indexFilter.status == 1).map((element) => */}
                                <a href={'http://localhost:3006/quan-ly-chi-tiet-bao-cao'} style={{ textDecoration: 'none' }} >
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
  </div>
);
export default App;
