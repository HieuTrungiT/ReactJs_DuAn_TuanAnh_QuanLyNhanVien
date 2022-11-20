import { Button, Modal, Form, Input, Select } from 'antd';
import { Validate_Name, Validate_Email, Validate_Phone, Validate_Gender, Validate_Password } from '../../../../../components/Validate/CheckValidate'
import React, { useState, useReducer } from 'react';
import { AddAcountUser } from '../../../../../Reducer/InitReducer/Staff/ListStaff';
import { AddCountUser } from '../../../../../Reducer/Reducers/Staff/listStaff';
import { setAccountUserStaff } from '../../../../../Reducer/Fetch_API/getlistStaff';
import { DATE_TIME } from '../../../../../components/DateTime/DateTime';

const { Option } = Select;
export default function AddAccountUser({ setModalAdd, modalAdd }) {
    const [form] = Form.useForm();
    const [state, dispatch] = useReducer(AddCountUser, AddAcountUser);

    const onsubmitSuccess = (values) => {
        values.timeRegister = DATE_TIME;
        setAccountUserStaff(dispatch, values)
    };

    {
        state.action === true && setTimeout(() => {
            setModalAdd(false)
        }, 1500)
    }
    return (
        <>
            <Modal title="Thêm Tài Khoản Nhân Viên"
                open={modalAdd}
                onOk={form.submit}
                onCancel={() => setModalAdd(false)}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onsubmitSuccess}
                >
                    <Form.Item
                        label="Tên Nhân Viên"
                        name="namestaff"
                        rules={Validate_Name}
                    >
                        <Input placeholder="Nhập Họ Và Tên Nhân Viên" />
                    </Form.Item>
                    <Form.Item
                        label="Email Nhân Viên"
                        name="emailstaff"
                        rules={Validate_Email}
                    >
                        <Input placeholder="Nhập Email Nhân Viên" />
                    </Form.Item>
                    <Form.Item
                        label="Số Điện Thoại Nhân Viên"
                        name="phonestaff"
                        rules={Validate_Phone}
                    >
                        <Input placeholder="Nhập Số Điện Thoại Nhân Viên" />
                    </Form.Item>
                    <Form.Item
                        className='input_gender'
                        label="Giới tính"
                        name="genderstaff"
                        rules={Validate_Gender}
                    >
                        <Select placeholder="Chọn giới tính">
                            <Option value="0">Khác</Option>
                            <Option value="1">Nam</Option>
                            <Option value="2">Nữ</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Mật Khẩu"
                        name="passwordstaff"
                        rules={Validate_Password}
                    >
                        <Input.Password placeholder='Nhập Mật Khẩu Nhân Viên' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};