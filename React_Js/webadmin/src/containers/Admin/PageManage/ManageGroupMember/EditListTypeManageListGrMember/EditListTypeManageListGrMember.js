import { Button, Form, Input, Select, Breadcrumb, Row, Col } from 'antd';
import * as type from '../../../../../components/Validate/CheckValidate';
import React, { useReducer, useEffect, useState, } from 'react';
import { FullStateManagament } from '../../../../../Reducer/InitReducer/Managament/indexManagament';
import * as Reducer from '../../../../../Reducer/Reducers/Managament/ProjectManagement';
import * as typeAPI from '../../../../../Reducer/Fetch_API/ApiTypeProject';
import {DATE_TIME} from '../../../../../components/DateTime/DateTime'
import './EditListTypeManageListGrMember.scss';
import { Link, useParams } from 'react-router-dom';

const { TextArea } = Input;
function AddListTypeManageListGrMember() {
    const [stateLeader, dispatchLeader] = useReducer(Reducer.getListUserLeader, FullStateManagament)
    const [stateStaff, dispatchStaff] = useReducer(Reducer.getListUserLeader, FullStateManagament)
    const [state, dispatch] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament)
    const [stateUpload, dispatchUpload] = useReducer(Reducer.getUploadIMG, FullStateManagament)
    const [avtatar, setAvatar] = useState()

    useEffect(() => {
        typeAPI.getListDataUserLeader(dispatchLeader)
        typeAPI.getListDataUserStaff(dispatchStaff)
    }, []);
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avtatar?.preview)
        }
    }, [avtatar]);
    const handlePreviewImage = (e) => {
        const file = e.target.files[0]
        typeAPI.upload({ dispatchUpload, file })
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
    }

    const onFinish = (values) => {
        values.avtatar = stateUpload.dataImg.filename;
        values.date = DATE_TIME;
        values.slug = values.namGroup.toLowerCase().replace(/[^\w-]+/g, '-');
        typeAPI.setAddGroupUser({ dispatch, values })
    };

    // console.log(useParams().id)
    return (
        <>
            <Breadcrumb className='label-breadcrumb'>
                <Breadcrumb.Item>TẠO NHÓM MỚI</Breadcrumb.Item>
            </Breadcrumb>
            <div className='full-bg-form-add-project'>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Row className='form-col'>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Tên Nhóm"
                                name="namGroup"
                                rules={type.Validate_required}
                            >
                                <Input placeholder="Nhập tên nhóm" />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Người Quản Lý Dự Án"
                                name="LeaderGroup"
                                rules={type.Validate_required}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn để tìm kiếm"
                                    optionFilterProp="children"
                                    allowClear
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={stateLeader?.dataleader && stateLeader.dataleader}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='form-col'>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Ảnh Nhóm"
                                name="imgGroup"
                                rules={type.Validate_required}
                            >
                                <input accept=".jpg, .png" style={{ width: '100%', marginBottom: '10px' }} className="form-control" type="file" onChange={handlePreviewImage} ></input>
                            </Form.Item>
                            {avtatar && (
                                <img src={avtatar.preview} alt="Image" width="40%"></img>
                            )}
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Nhân Viên Nhóm"
                                name="userGroup"
                                rules={type.Validate_required}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    placeholder="Chọn để tìm kiếm"
                                    options={stateStaff.datastaff}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='form-col'>
                        <Col lg={23} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Mô Tả - Giới Thiệu Nhóm"
                                name="commentGroup"
                                rules={type.Validate_required}
                            >
                                <TextArea rows={4} placeholder="Nhập mô tả" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row className='form-col'>
                        <Col lg={23} md={24} sm={24} xs={24}>
                            <Form.Item>
                                <button htmlType="submit" className="glow-on-hover" type="primary">Thêm Nhóm Mới</button>
                                <Link to={'/quan-ly-nhom'}><button htmlType="submit" className="glow-on-hover1" type="primary">Danh Sách Nhóm</button></Link>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}

export default AddListTypeManageListGrMember;