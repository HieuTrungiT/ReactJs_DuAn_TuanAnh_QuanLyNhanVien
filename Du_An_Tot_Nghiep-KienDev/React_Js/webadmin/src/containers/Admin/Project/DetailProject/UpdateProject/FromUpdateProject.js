import { Button, Form, Input, Select, Breadcrumb, Row, Col, DatePicker, Space, message, Upload, Switch} from 'antd';
// import './FormAddProject.scss';


import moment from 'moment';
import * as type from '../../../../../components/Validate/CheckValidate';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState, useRef, useReducer, useEffect } from 'react';
import { FullStateManagament } from '../../../../../Reducer/InitReducer/Managament/indexManagament';
import * as Reducer from '../../../../../Reducer/Reducers/Managament/ProjectManagement';
import * as typeAPI from '../../../../../Reducer/Fetch_API/ApiTypeProject';
import { post } from '../../post'
import axios from "axios";
var baseUrl = (window.location).href; // You can also use document.URL
var idWork = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);

const { RangePicker } = DatePicker;

const FromUpdateProject = () => {
    var countCheckReloadData = 0;
    const [form] = Form.useForm();
    const [stateItem, dispatchitem] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament)
    const [valueTypeWorkSelect, setValueTypeWorkSelect] = useState();
    const [stateAddItem, dispatchAdditem] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament)
    const [name, setName] = useState('');
    const [groupSelect, setGroupSelect] = useState([]);
    const [valueDefauleSelectGroup, setValueDefauleSelectGroup] = useState([]);
    const [nameGroup, setNameGroup] = useState([]);
    const [idUseGroup, setIdUseGroup] = useState([]);
    const [text, setText] = useState([]);

    const [work, setWork] = useState({});
    const [nameWork, setNameWork] = useState('');
    const inputRef = useRef(null);

    const getWork = async () => {

        const baseurl = 'http://' + post + '/getWorkObjects/?idWork=' + idWork;
        const response = await axios.get(baseurl);
        var element = response.data[0];
        setText({
            note: "2",
            gender: "demo",
            Picker: [moment(element.deadlineFrom), moment(element.deadlineTo)]
          });
        setWork(element)
        setNameWork(element.nameWork)
        getGroups(element);

    }


    const onFinish = (values) => {
        let text = "Bạn có muốn xác nhận sửa thông tin dự án?";
        if (window.confirm(text) == true) {
            text = "Đồng ý";
            axios.post('http://' + post + '/UpdateWork', {
                data:
                {
                    idWork: idWork,
                    nameWork: values.nameProject == null ? work.nameWork : values.nameProject,
                    deadlineFrom: values.datedob[0]._d,
                    deadlineTo: values.datedob[1]._d,
                    criticalLevel: values.criticalLevel,
                    idPorjectType: values.projectType,
                }
            }
            ).then(response => {
                var idWorkTemp = response.data.insertId;
                if (response.data = 'ok') {
                    console.log("Upload successful");
                    onReset();
                    alert("Sửa dự án thành công!")
                    window.location.href = 'http://localhost:3006/quan-ly-chi-tiet-bao-cao?idWork='+ idWork
                }
            });
        } else {
            text = "Hủy!";

        }

    };

    const getGroups = async (dataWork) => {

        const baseurl = 'http://' + post + '/getListGrType';
        const response = await axios.get(baseurl);
        var data = response.data;

        data.map((item) => {
            setGroupSelect((groupSelect) => [...groupSelect, {
                label: item.tennhom,
                value: item.id,
            }]);

            let arrayIdGroup = JSON.parse(dataWork.idGroup)

            console.log(JSON.parse(dataWork.idGroup));
            for (let i = 0; i < arrayIdGroup.length; i++) {
                const element = arrayIdGroup[i];
                if (element == item.id) {
                    setValueDefauleSelectGroup((valueDefauleSelectGroup) => [...valueDefauleSelectGroup, {
                        label: item.tennhom,
                        value: item.id,
                    }])
                }
            }
        });


        form.resetFields();
    }



    //Form Add Items
    useEffect(() => {
        if (countCheckReloadData == 0) {

            getWork();
            typeAPI.getListTypeProject(dispatchitem)

            countCheckReloadData++;
        }
    }, []);

    const addItem = (e) => {
        e.preventDefault();
        {
            name == '' || name == null ? <></> :
                typeAPI.setAddTypeProjectForm({ dispatchAdditem, name });
        }
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);

    };


    const onProjectTypeChange = (value) => {
        // data id loại dự án
        console.log(value);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };





    const handleChange = async (value) => {
        setNameGroup([]);
        setIdUseGroup([]);
        if (value == null) {
            setNameGroup([]);
            setIdUseGroup([]);
        }
        for (let i = 0; i < value.length; i++) {
            const idGroup = value[i];
            const baseurl = 'http://' + post + '/getGroup/?idGroup=' + idGroup;
            const response = await axios.get(baseurl);
            var element = response.data[0];
            setNameGroup((nameGroup) => [...nameGroup, element.tennhom]);
            setIdUseGroup((idUseGroup) => [...idUseGroup, element.nhanviennhom])
        }
    };

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    form.setFieldsValue({
        note: text.note,
        gender: text.gender,
        datedob: text.Picker
      });
    const checkData = () => {
        console.log(valueDefauleSelectGroup);

    }

    return (
        <>

            <Breadcrumb className='label-breadcrumb'>
                <Breadcrumb.Item>SỬA DỰ ÁN</Breadcrumb.Item>
            </Breadcrumb>
            <div className='full-bg-form-add-project'>
                {/* <button onClick={() => checkData()}></button> */}
                <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                    <Row className='form-col'>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Tên Dự Án"
                                name="nameProject"
                            // rules={type.Validate_Name_Project}
                            >
                                <Input defaultValue={nameWork} placeholder="Nhập tên dự án của bạn" />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Loại Dự Án"
                                name="projectType"
                            // rules={type.Validate_required}
                            >
                                <Select
                                    placeholder="Chọn loại dự án"
                                    onChange={onProjectTypeChange}
                                    allowClear
                                    defaultValue={stateItem.data.filter(indexFilter => work.idPorjectType == indexFilter.id).map((item) => ({
                                        label: item.tenduan,
                                        value: item.id
                                    }))}
                                    showSearch
                                    options={stateItem.data.map((item) => ({
                                        label: item.tenduan,
                                        value: item.id,
                                    }))}

                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Space
                                                style={{
                                                    padding: '8px 0 8px 4px',
                                                }}
                                            >
                                                <Input
                                                    placeholder="Thêm loại dự án"
                                                    ref={inputRef}
                                                    value={name}
                                                    defaultValue={nameWork}
                                                    onChange={(event) => setName(event.target.value)}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                    Thêm Items
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='form-col' style={{ paddingTop: '20px' }}>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Tên Nhóm (Phòng Ban)"
                                name="arrayIdGroup"
                            // rules={type.Validate_required}
                            >
                                <Select
                                    mode="multiple"
                                    disabled
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    defaultValue={valueDefauleSelectGroup}
                                    placeholder="Please select"
                                    onChange={handleChange}
                                    options={groupSelect}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Cấp độ dự á"
                                name="criticalLevel"
                            // rules={type.Validate_required}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn cấp độ dự án"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}

                                    allowClear
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    defaultValue={work.criticalLevel == 1 ? [{
                                        value: 1,
                                        label: 'Gấp',
                                    }] : {
                                        value: 0,
                                        label: 'Bình thường',
                                    }}
                                    options={[
                                        {
                                            value: 1,
                                            label: 'Gấp',
                                        },
                                        {
                                            value: 0,
                                            label: 'Bình thường',
                                        }

                                    ]}
                                />
                            </Form.Item>
                        </Col>


                    </Row>
                    <Row className='form-col' style={{ paddingTop: '20px' }}>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Dự Kiến Ngày Bắt Đầu & Kết Thúc"
                                name="datedob"
                            // rules={type.Validate_required}
                            >
                                <RangePicker  style={{ width: '100%', }}


                                    dateRender={(current) => {
                                        return (
                                            <div className="ant-picker-cell-inner">
                                                {current.date()}
                                            </div>
                                        );
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24} />

                    </Row>
                    <Row className='form-col' style={{ paddingTop: '20px' }}>
                        <Col lg={23} md={24} sm={24} xs={24}>
                            <div style={{ display: "flex" }}>
                                {/* <button type="primary" onClick={() => onReset()} htmlType="submit" >
                                    <span>LÀM MỚI</span>
                                </button> */}
                                <button htmlType="button" >
                                    <span>LƯU</span>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}
export default FromUpdateProject;
