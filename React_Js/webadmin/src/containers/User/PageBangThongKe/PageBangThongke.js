import React, { useState, useEffect, useRef } from "react";
import './PageBangThongKe.css';
import { post } from '../../Admin/Project/post'
import axios from "axios";
import imgInfTest from "../icons/imgTest2.png";
import imgChartPie from "../icons/NBcharts-PIE.png";
import imgChartLine from "../icons/NBcharts-lineChats.png";

function PageBangThongKe() {

    return (
        <div className="containers-page_thong_ke">
            <div className="containers">
                <p className="title-text">
                    BẢNG THÔNG KÊ CÔNG VIỆC
                </p>
                <div className="contais-from_header">
                    <div className="contai-chart_pie">
                        <p style={{ fontWeight: 'Bold' }}>Tiến độ dự án</p>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <img src={imgChartPie} />
                        </div>
                        <div style={{display:'flex',justifyContent:'flex-end',margin:'10px'}}>
                            <img src={imgInfTest} />
                        </div>
                    </div>
                    <div className="contai-config_table_data">
                        <p style={{ textAlign: 'end', color: "#FF424F", fontSize: '10px', cursor: 'pointer' }} className="btn-clear_all">Clear All</p>
                        < div className="contai-pick-show-date">
                            <div className="pick_week">
                                Tuần
                            </div>
                            <div className="pick_month">
                                Tháng
                            </div>
                            <div className="pick_year">
                                Năm
                            </div>

                        </div>
                        <div className="contai-pick-show-time_form_to">
                            <div className="header-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="title-time_form_to" style={{
                                    fontWeight: '500', margin: '0px', fontSize: '16px', lineHeight: '19px', color: '#000000',
                                }}>Từ khoảng</p>
                                <p className="btn-clear-time_form_to" style={{
                                    fontWeight: '500',
                                    fontSize: '10px',
                                    margin: '0px',
                                    lineHeight: '12px',
                                    color: '#549CFD',
                                    cursor: 'pointer'
                                }}>Clear</p>
                            </div>
                            <div className="form-time_form_to">
                                <p>Form</p>
                                <input type="text" name="form" className="ipt-time_form" />
                                <p>To</p>
                                <input type="text" name="form" className="ipt-time_to" />
                            </div>
                        </div>
                        <div className="contai-pick-tag_group">
                            <div className="header-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="title-tag_group" style={{
                                    margin: '0px',
                                    fontWeight: '700', fontSize: '16px', lineHeight: '19px', color: '#000000',
                                }}>Nhóm</p>
                                <p className="btn-clear-tag_group" style={{
                                    fontWeight: '500',
                                    fontSize: '10px',
                                    margin: '0px',
                                    lineHeight: '12px',
                                    color: '#549CFD',
                                    cursor: 'pointer'
                                }}>Clear</p>
                            </div>
                            <div className="form-list_tag">
                                <ul>
                                    <li>#LTMT</li>
                                    <li>#TKDH</li>
                                    <li>#LTMT</li>
                                    <li>#TKDH</li>
                                    <li>#LTMT</li>
                                    <li>#TKDH</li>
                                    <li>#TUFS</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contais-form_bottom">
                    <p style={{ fontWeight: 'Bold' }}>Mức công việc được giao</p>
                    <img style={{ width: '100%' }} src={imgChartLine} />
                </div>
            </div>
        </div>
    );
}

export default PageBangThongKe;
