import { Button, Form, Input, Select, Breadcrumb, Row, Col, DatePicker, Space, message, Upload, Switch } from 'antd';
import './FormAddProject.scss';
import * as type from '../../../../../components/Validate/CheckValidate';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState, useRef, useReducer, useEffect } from 'react';
import { FullStateManagament } from '../../../../../Reducer/InitReducer/Managament/indexManagament';
import * as Reducer from '../../../../../Reducer/Reducers/Managament/ProjectManagement';
import * as typeAPI from '../../../../../Reducer/Fetch_API/ApiTypeProject';
import { post } from '../../post'
import axios from "axios";
let index = 0;
const { RangePicker } = DatePicker;
const FormAddProject = () => {
    const [form] = Form.useForm();
    const [stateItem, dispatchitem] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament)
    const [stateAddItem, dispatchAdditem] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament)
    const [name, setName] = useState('');
    const [group, setGroup] = useState([]);
    const [nameGroup, setNameGroup] = useState([]);
    const [idUseGroup, setIdUseGroup] = useState([]);
    const inputRef = useRef(null);

    const onFinish = (values) => {


        axios.post('http://' + post + '/UploadWork', {
            data:
            {
                nameWork: values.nameProject,
                deadlineFrom: values.datedob[0]._d,
                deadlineTo: values.datedob[1]._d,
                idGroup: values.arrayIdGroup,
                group: nameGroup,
                criticalLevel: values.criticalLevel,
                idPorjectType: values.projectType,
            }
        }
        ).then(response => {
            var idWorkTemp = response.data.insertId;
            if (response.data = 'ok') {
                console.log(idWorkTemp);
                if (idWorkTemp != null) {
                    for (let i = 0; i < idUseGroup.length; i++) {
                        const elemenIdUseGroup = JSON.parse(idUseGroup[i]);
                        for (let j = 0; j < elemenIdUseGroup.length; j++) {
                            const idUser = elemenIdUseGroup[j];
                            axios.post('http://' + post + '/UploadUserTag', {
                                data:
                                {
                                    idWork: idWorkTemp,
                                    idUser: idUser
                                }
                            }
                            ).then(response => {
                                if (response.data = 'ok') {
                                    console.log("Upload successful");
                                }
                            });
                        }
                    }
                }
                onReset();
                alert("Thêm dự án thành công!")
            }
        });
    };

    const getGroups = async () => {
        const baseurl = 'http://' + post + '/getListGrType';
        const response = await axios.get(baseurl);
        var data = response.data;
        console.log(data);
        setGroup(data);
    }

    const setDataWorkUserTag = () => {

    }

    //Form Add Items
    useEffect(() => {
        typeAPI.getListTypeProject(dispatchitem)
        getGroups();
    }, [stateAddItem]);
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

    const options = [];
    group.map((item) => {
        options.push({
            label: item.tennhom,
            value: item.id,
        });
    });



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
        console.log(idUseGroup);

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

    return (
        <>

            <Breadcrumb className='label-breadcrumb'>
                <Breadcrumb.Item>TẠO DỰ ÁN MỚI</Breadcrumb.Item>
            </Breadcrumb>
            <div className='full-bg-form-add-project'>
                <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                    <Row className='form-col'>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Tên Dự Án"
                                name="nameProject"
                            // rules={type.Validate_Name_Project}
                            >
                                <Input placeholder="Nhập tên dự án của bạn" />
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
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Please select"
                                    onChange={handleChange}
                                    options={options}
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
                                <RangePicker style={{ width: '100%', }}
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
                                <button type="primary" onClick={()=> onReset()} htmlType="submit" >
                                    <span>LÀM MỚI</span>
                                </button>
                                <button htmlType="button" style={{ marginLeft: '40px' }}>
                                    <span>LƯU</span>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};
export default FormAddProject;
