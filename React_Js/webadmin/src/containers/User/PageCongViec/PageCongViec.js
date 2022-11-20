import './PageCongViec.css';
import icoShowDetails from "../icons/icon_showDetail.png";
import React, { useState, useEffect, useRef } from "react";
import { post } from '../../Admin/Project/post'
import axios from "axios";
import pageBaoCaoCongViec from '../PageBaoCaoCongViec/PageBaoCaoCongViec'
function PageCongViec() {

    var countCheckReloadData = 0;
    const [listWorkUserTag,setListWorkUserTag] = useState([]);
    const [arrayListWork,setListWorkUser] = useState([]);

    // Get list work user tag
    const getWorkUserTags = async()=>{
        const baseurl = 'http://' + post + '/getWorkUserTags/?idUser=17';
        const response = await axios.get(baseurl);
        setListWorkUserTag(response.data);
        var listUserTags = response.data;

        // Get danh sách công việc element của tag work tại idWork
        listUserTags.map((element)=>{
            getWorkObjects(element)
        });
        
    }

    const getWorkObjects = async (element)=>{
        const baseurl = 'http://' + post + '/getWorkObjects/?idWork='+element.idWork;
        const response = await axios.get(baseurl);
        var arrWorkUser =  await {
            idWorkTagUser:element.id,
            status:element.status,
            workObject:response.data[0]
        }
        setListWorkUser(arrayListWork=>[...arrayListWork,arrWorkUser])
    }

    

    useEffect(()=>{
        if(countCheckReloadData == 0){
            getWorkUserTags();
            countCheckReloadData ++;
        }
    },[])

  
    return (
      
       
            <div className="containers-page_cong_viec">     
                <div className="containers">
                    <div className='contai-form'>
                        <p className='title-form'>CÔNG VIỆC</p>
                        <div className='form-body'>
                            <div className="thead">
                                <th>Tên công việc</th>
                                <th>Thời gian (Deadline)</th>
                                <th>Nhóm</th>
                                <th>Mức độ ưu tiên</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </div>
                            <div className="tbody">
                                {arrayListWork.filter(indexFilter => indexFilter.status == 0 || indexFilter.status == 1 ).map((element)=>
                                <a style={{textDecoration:'none'}} href={'http://localhost:3006/Cong-viec/Bao-cao-cong-viec?idWorkUserTag='+element.idWorkTagUser }>
                                    <div  className="tbody-element" key={element.idWorkTagUser}>
                                        <td style={{textAlign:'left'}}>{element.workObject.nameWork}</td>
                                        <td>{new Date(element.workObject.deadlineFrom).getDate() +"/"+ (new Date(element.workObject.deadlineFrom).getMonth() +1)} - {new Date(element.workObject.deadlineTo).getDate() +"/"+ (new Date(element.workObject.deadlineTo).getMonth() +1) }</td>
                                        <td style={{color:'#A162F7'}}>{element.workObject.group}</td>
                                        <td><div style={{backgroundColor:element.workObject.criticalLevel == 0 ? '#4F46BA':'#FFC430'}} className='box-color_status'></div></td>
                                        <td style={{color:element.status == 0 ? '#A162F7' : '#19B131'}}>{element.status == 0 ? 'Đang làm' : element.status == 1?'Đã xong' :''}</td>
                                        <td className='btn_showDetails' >   <img src={icoShowDetails} /></td>
                                    </div>
                                </a>
                          
                                )}
                            </div>
                        </div>
                        <div className='annontation_table'>
                            <div className='annontation_element'>
                                <p className='content-annonttation'>Bình thường</p>
                                <div style={{backgroundColor:'#4F46BA'}} className='box-color_annontation'/>
                            </div>
                            <div className='annontation_element'>
                                <p className='content-annonttation'>Gấp</p>
                                <div style={{backgroundColor:'#FFC430'}}className='box-color_annontation'/>
                            </div>
                        </div>
                    </div>
                    <div className='contai-form'>
                        <p slyte={{color:'#FFC430'}} className='title-form title-slow_work'>CÔNG VIỆC ĐANG CHẬM</p>
                        <div className='form-body'>
                            <div className="thead">
                                <th>Tên công việc</th>
                                <th>Thời gian (Deadline)</th>
                                <th>Nhóm</th>
                                <th>Mức độ ưu tiên</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </div>
                            <div className="tbody">
                            {arrayListWork.filter(indexFilter => indexFilter.status == 2 ).map((element)=>
                                <a style={{textDecoration:'none'}} href={'http://localhost:3006/Cong-viec/Bao-cao-cong-viec?idWorkUserTag='+element.idWorkTagUser }>
                                    <div  className="tbody-element" key={element.idWorkTagUser} >
                                        <td style={{textAlign:'left'}}>{element.workObject.nameWork}</td>
                                        <td>{new Date(element.workObject.deadlineFrom).getDate() +"/"+ (new Date(element.workObject.deadlineFrom).getMonth()+1) } - {new Date(element.workObject.deadlineTo).getDate() +"/"+ (new Date(element.workObject.deadlineTo).getMonth()+1) }</td>
                                        <td style={{color:'#A162F7'}}>{element.workObject.group}</td>
                                        <td><div style={{backgroundColor:element.workObject.criticalLevel == 0 ? '#4F46BA':'#FFC430'}} className='box-color_status'></div></td>
                                        <td style={{color:'#FFC430'}}>Chậm</td>
                                        <td className='btn_showDetails' >   <img src={icoShowDetails} /></td>
                                    </div>
                                </a>
                                )}
                            </div>
                        </div>
                        <div className='annontation_table'>
                            <div className='annontation_element'>
                                <p className='content-annonttation'>Bình thường</p>
                                <div style={{backgroundColor:'#4F46BA'}} className='box-color_annontation'/>
                            </div>
                            <div className='annontation_element'>
                                <p className='content-annonttation'>Gấp</p>
                                <div style={{backgroundColor:'#FFC430'}}className='box-color_annontation'/>
                            </div>
                        </div>
                    </div>
                    <div className='contai-form'>
                        <p className='title-form title-over_work' slyte={{color:'#FF424F'}} >CÔNG VIỆC BỊ QUÁ TIẾN ĐỘ</p>
                        <div className='form-body'>
                            <div className="thead">
                                <th>Tên công việc</th>
                                <th>Thời gian (Deadline)</th>
                                <th>Nhóm</th>
                                <th>Mức độ ưu tiên</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </div>
                            
                            <div className="tbody">
                            {arrayListWork.filter(indexFilter => indexFilter.status == 3 ).map((element)=>
                                <a style={{textDecoration:'none'}} href={'http://localhost:3006/Cong-viec/Bao-cao-cong-viec?idWorkUserTag='+element.idWorkTagUser }>
                                    <div className="tbody-element" key={element.idWorkTagUser} >
                                        <td style={{textAlign:'left'}}>{element.workObject.nameWork}</td>
                                        <td>{new Date(element.workObject.deadlineFrom).getDate() +"/"+ (new Date(element.workObject.deadlineFrom).getMonth() +1) } - {new Date(element.workObject.deadlineTo).getDate() +"/"+ (new Date(element.workObject.deadlineTo).getMonth() +1)}</td>
                                        <td style={{color:'#A162F7'}}>{element.workObject.group}</td>
                                        <td><div style={{backgroundColor:element.workObject.criticalLevel == 0 ? '#4F46BA':'#FFC430'}} className='box-color_status'></div></td>
                                        <td style={{color:'#FF424F'}}>Fail</td>
                                        <td className='btn_showDetails' >   <img src={icoShowDetails} /></td>
                                    </div>
                                </a>
                                )}
                            </div>
                        </div>
                        <div className='annontation_table'>
                            <div className='annontation_element'>
                                <p className='content-annonttation'>Bình thường</p>
                                <div style={{backgroundColor:'#4F46BA'}} className='box-color_annontation'/>
                            </div>
                            <div className='annontation_element'>
                                <p className='content-annonttation'>Gấp</p>
                                <div style={{backgroundColor:'#FFC430'}}className='box-color_annontation'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     
    );
}
export default PageCongViec;