import React, { useState, useEffect, useRef, Component } from "react";
import './PageBangThongKe.css';
import { post } from '../../Admin/Project/post'
import axios from "axios";
import imgInfTest from "../icons/imgTest2.png";
import imgChartPie from "../icons/NBcharts-PIE.png";
import imgChartLine from "../icons/NBcharts-lineChats.png";

import CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function PageBangThongKe() {



    var countCheckReloadData = 0;
    const [listWorkUserTag, setListWorkUserTag] = useState([]);
    const [arrayListWork, setListWorkUser] = useState([]);
    const [arrayListWorkDate, setListWorkDate] = useState([]);
    const [arrGounps, setArrGrounp] = useState([]);
    var date = new Date; // get current date
    const idUserJson = localStorage.getItem('idUser');
    const idUser = JSON.parse(idUserJson);
    // Get list work user tag
    const getWorkUserTags = async () => {
        setListWorkUserTag([]);
        setListWorkUser([]);
        setArrGrounp([]);

        const baseurl = 'http://' + post + '/getWorkUserTags/?idUser='+idUser;
        const response = await axios.get(baseurl);
        setListWorkUserTag(response.data);
        var listUserTags = response.data;

        // Get danh sách công việc element của tag work tại idWork
        listUserTags.map((element) => {
            getWorkObjects(element)
        });

    }

    const getWorkObjects = async (element) => {
        const baseurl = 'http://' + post + '/getWorkObjects/?idWork=' + element.idWork;
        const response = await axios.get(baseurl);
        var arrWorkUser = await {
            idWorkTagUser: element.id,
            status: element.status,
            workObject: response.data[0]
        }
        setListWorkUser(arrayListWork => [...arrayListWork, arrWorkUser])
        setArrGrounp((arrGounps) => [...arrGounps, arrWorkUser.workObject.group]);
    }


    const GetListLevelOfWork = () => {
        // Lấy danh sách tại Date from "Ngày thấp nhât"
        // Lấy danh sách tại Date to ngày "cao nhất"
        var dateMinFrom;
        var dateMaxTo;
        // Cách lấy ngày thấp nhất tại form
        // Đặt biến tạm dateMinFrom;

        for (var i = 0; i < arrayListWork.length; i++) {

            let element = arrayListWork[i].workObject;
            var dateFromTemb = new Date(element.deadlineFrom);
            var dateToTemb = new Date(element.deadlineTo);
            if (dateMinFrom == null) {
                dateMinFrom = dateFromTemb;
            }

            if (dateMaxTo == null) {
                dateMaxTo = dateToTemb;
            }


            console.log(element.group);
            // Kiểm tra ngày from nhỏ nhất
            if (dateMinFrom > dateFromTemb) {
                dateMinFrom = dateFromTemb;
            }

            // Kiểm tra ngày from Lớn nhất
            if (dateMaxTo < dateToTemb) {
                dateMaxTo = dateToTemb;
            }

            // sắp xếp mảng
            for (var j = i + 1; j < arrayListWork.length; j++) {
                if (arrayListWork[i].deadlineFrom > arrayListWork[j].deadlineFrom) {
                    var temp;
                    temp = arrayListWork[i].deadlineFrom;
                    arrayListWork[i].deadlineFrom = arrayListWork[j].deadlineFrom
                    arrayListWork[j].deadlineFrom = temp;
                }
            }
        }
    }

    const options = {
        animationEnabled: true,
        title: {
            // text: "Monthly Sales - 2017"
        },
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            // title: "Sales (in USD)",
            // prefix: "",
            includeZero: true
        },
        data: [{
            yValueFormatString: "Số lượng công việc: ###",
            xValueFormatString: "MMMM",
            // type: "spline",
            dataPoints: [
                { y: 2, label: "s" },
                { y: 2, label: "s" },
            ]
        }]
    }
    const optionsPie = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            // text: "Website Traffic Sources"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: ((GetNumberState(0) / arrayListWork.length) * 100), label: "Đang làm" },
                { y: ((GetNumberState(3) / arrayListWork.length) * 100), label: "Fail" },
                { y: ((GetNumberState(1) / arrayListWork.length) * 100), label: "Đã xong" },
                { y: ((GetNumberState(2) / arrayListWork.length) * 100), label: "Chậm" },
            ]
        }]
    }
    function GetNumberState(number) {
        var count = 0;
        for (var i = 0; i < arrayListWork.length; i++) {
            if (arrayListWork[i].status == number) {
                count += 1;
            }
        }
        return count;
    }
    useEffect(() => {
        if (countCheckReloadData == 0) {
            getWorkUserTags();
            GetListLevelOfWork();
            countCheckReloadData++;
        }
    }, [])
    const testData = () => {

    }
    const filterOneWeek = () => {
        getWorkUserTags();
        var listTemb = arrayListWork;
        setListWorkUser([])

        var first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
        var last = first - 6; // last day is the first day + 6
        var lastday = new Date(date.setDate(last));

        for (let index = 0; index < listTemb.length; index++) {
            const element = listTemb[index];
            const dateFromElement = element.workObject.deadlineFrom;
            const dateTemb = new Date(dateFromElement)



            if (dateTemb  >= lastday) {
                setListWorkUser(arrayListWork => [...arrayListWork, element])
                console.log(element);
            }
        }

    }
    const filterOneMonth = () => {
        getWorkUserTags();
        var listTemb = arrayListWork;
        setListWorkUser([])

        var newDateMonth = new Date(date.setMonth(date.getMonth() -1));

        for (let index = 0; index < listTemb.length; index++) {
            const element = listTemb[index];
            const dateFromElement = element.workObject.deadlineFrom;
            const dateTemb = new Date(dateFromElement)

            if (dateTemb >= newDateMonth) {
                setListWorkUser(arrayListWork => [...arrayListWork, element])
            }
        }

    }
    const filterOneYear = () => {
        getWorkUserTags();
        var listTemb = arrayListWork;
        setListWorkUser([])

        var newDateYear = new Date(date.setFullYear(date.getFullYear() - 1));

        for (let index = 0; index < listTemb.length; index++) {
            const element = listTemb[index];
            const dateFromElement = element.workObject.deadlineFrom;
            const dateTemb = new Date(dateFromElement)

            if (dateTemb >= newDateYear) {
                setListWorkUser(arrayListWork => [...arrayListWork, element])
            }
        }


    }
    const filterOneGroup =(nameGounp)=>{
        getWorkUserTags();
        var listTemb = arrayListWork;
        console.log(arrayListWork);
        setListWorkUser([])

        for (let index = 0; index < listTemb.length; index++) {
            const element = listTemb[index];
            const nGrounp = element.workObject.group;


            if (nGrounp == nameGounp) {
                setListWorkUser(arrayListWork => [...arrayListWork, element])
            }
        }

    }

    return (
        <div className="containers-page_thong_ke">

            <div className="containers">
                <p className="title-text">
                    BẢNG THÔNG KÊ CÔNG VIỆC
                </p>
                <div className="contais-from_header">
                    <div className="contai-chart_pie">
                        <p style={{ fontWeight: 'Bold' }}>Tiến độ dự án</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <CanvasJSChart options={optionsPie} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
                            {/* <img src={imgInfTest} /> */}
                        </div>
                    </div>
                    <div className="contai-config_table_data">
                        <p style={{ textAlign: 'end', color: "#FF424F", fontSize: '10px', cursor: 'pointer' }} className="btn-clear_all" onClick={()=> getWorkUserTags()}>Clear All</p>
                        < div className="contai-pick-show-date">
                            <div className="pick_week" onClick={() => filterOneWeek()}>
                                Tuần
                            </div>
                            <div className="pick_month" onClick={() => filterOneMonth()}>
                                Tháng
                            </div>
                            <div className="pick_year" onClick={() => filterOneYear()}>
                                Năm
                            </div>

                        </div>
                        <div className="contai-pick-show-time_form_to">
                            {/* <div className="header-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                            </div> */}
                            {/* <div className="form-time_form_to">
                                <p>Form</p>
                                <input type="text" name="form" className="ipt-time_form" />
                                <p>To</p>
                                <input type="text" name="form" className="ipt-time_to" />
                            </div> */}
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

                                    {
                                        arrGounps.map(element =>
                                            <li onClick={()=>filterOneGroup(element)}>#{element}</li>
                                        )
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="contais-form_bottom">
                    <p style={{ fontWeight: 'Bold' }}>Mức công việc được giao</p>

                    <CanvasJSChart options={options} />
                </div> */}
            </div>
        </div>
    );
}

export default PageBangThongKe;
