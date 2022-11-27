import { Button, Form, Input, Select, Breadcrumb, Row, Col, DatePicker, Space, message, Upload, Switch } from 'antd';
import './FormAddProject.scss';
import * as type from '../../../../../components/Validate/CheckValidate';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState, useRef, useReducer, useEffect } from 'react';
import { FullStateManagament } from '../../../../../Reducer/InitReducer/Managament/indexManagament';
import * as Reducer from '../../../../../Reducer/Reducers/Managament/ProjectManagement';
import * as typeAPI from '../../../../../Reducer/Fetch_API/ApiTypeProject';
let index = 0;
const { RangePicker } = DatePicker;
const FormAddProject = () => {
    const [form] = Form.useForm();
    const [stateItem, dispatchitem] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament)
    const [stateAddItem, dispatchAdditem] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament)
    const [name, setName] = useState('');
    const inputRef = useRef(null);

    //Form Add Items
    useEffect(() => {
        typeAPI.getListTypeProject(dispatchitem)
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


    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({
                    note: 'Hi, man!',
                });
                return;
            case 'female':
                form.setFieldsValue({
                    note: 'Hi, lady!',
                });
                return;
            case 'other':
                form.setFieldsValue({
                    note: 'Hi there!',
                });
        }
    };
    const onFinish = (values) => {
        console.log(values);
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
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
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
                                rules={type.Validate_Name_Project}
                            >
                                <Input placeholder="Nhập tên dự án của bạn" />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Loại Dự Án"
                                name="projectType"
                                rules={type.Validate_required}
                            >
                                <Select
                                    placeholder="Chọn loại dự án"
                                    onChange={onGenderChange}
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
                                name="nameGroup"
                                rules={type.Validate_required}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Please select"
                                    defaultValue={['a10', 'c12']}
                                    onChange={handleChange}
                                    options={options}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Người Quản Lý Dự Án"
                                name="Leader"
                                rules={type.Validate_required}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn để tìm kiếm"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    allowClear
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: 'jack',
                                            label: 'Jack',
                                        },
                                        {
                                            value: 'lucy',
                                            label: 'Lucy',
                                        },
                                        {
                                            value: 'tom',
                                            label: 'Tom',
                                        },
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
                                rules={type.Validate_required}
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
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Row className='form-coll'>
                                <Col span={11}>
                                    <Form.Item
                                        label="Ảnh Đại Diện Dự Án"
                                        name="UpdateImg"
                                        rules={type.Validate_required}
                                    >
                                        <Space
                                            direction="vertical"
                                            style={{
                                                width: '100%',
                                            }}
                                            size="large"
                                        >
                                            <Upload
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                listType="picture"
                                                maxCount={1}
                                            >
                                                <Button icon={<UploadOutlined />}>Chọn để tải ảnh</Button>
                                            </Upload>
                                        </Space>
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label="Khởi Chạy Dự Án"
                                        name="StartProject"
                                        rules={type.Validate_required}
                                    >
                                        <Switch defaultChecked onChange={onChange} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='form-col' style={{ paddingTop: '20px' }}>
                        <Col lg={23} md={24} sm={24} xs={24}>
                            <Form.Item >
                                <button type="primary" htmlType="submit" className='custom-btn btn-12'>
                                    <span>LƯU</span><span>LÀM MỚI</span>
                                </button>
                                <button htmlType="button" onClick={onReset} style={{ marginLeft: '40px' }} className='custom-btn btn-11'>
                                    <span>LÀM MỚI</span><span>LƯU</span>
                                </button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};
export default FormAddProject;