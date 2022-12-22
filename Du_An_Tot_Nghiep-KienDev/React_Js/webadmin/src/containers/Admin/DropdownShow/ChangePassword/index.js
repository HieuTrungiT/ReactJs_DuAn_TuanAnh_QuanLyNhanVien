import React, { useReducer } from "react";
import { Breadcrumb, Button, Form, Input, Popconfirm } from 'antd';
import { setPasswordInit } from '../../../../Reducer/InitReducer/Auth/setPassword';
import { setPasswordRedux } from '../../../../Reducer/Reducers/Auth/setPassword';
import { setPassword } from '../../../../Reducer/Fetch_API/setPassword';
import { ForgotPassword } from '../../../../Reducer/InitReducer/Auth/initNew';
import { Succ_ForgotPw } from '../../../../Reducer/Reducers/Auth';
import { SetJobForgotPasswords } from '../../../../Reducer/Actions/Auth/index';
import { DATE_TIME } from '../../../../components/DateTime/DateTime';
import { Validate_Password, Validate_Re_Password_Change } from '../../../../components/Validate/CheckValidate';
import './ChangePwStyle.scss'
function ChangePassword() {
    const [state, dispatch] = useReducer(setPasswordRedux, setPasswordInit);
    const [stateForgotPW, dispatchForgotPW] = useReducer(Succ_ForgotPw, ForgotPassword);
    const onFinish = (values) => {
        setPassword(dispatch, values);
    };

    const confirm = () =>
        new Promise((resolve) => {
            setTimeout(() => resolve(dispatchForgotPW(SetJobForgotPasswords(DATE_TIME))), 500);
        });

    return (
        <div >
            <Breadcrumb className='label-breadcrumb'>
                <Breadcrumb.Item>Đổi Mật Khẩu</Breadcrumb.Item>
            </Breadcrumb>
            <div className="conten_changePass">
                <Form
                    name="basic"
                    layout="vertical"
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Mật Khẩu Cũ"
                        name="passwordOld"
                        rules={Validate_Password}
                    >
                        <Input.Password placeholder="Nhập Mật Khẩu Cũ" />
                    </Form.Item>

                    <Form.Item
                        label="Mật Khẩu Mới"
                        name="passwordNew"
                        rules={Validate_Password}
                    >
                        <Input.Password placeholder="Nhập Mật Khẩu Mới" />
                    </Form.Item>

                    <Form.Item
                        label="Nhập Lại Mật Khẩu Mới"
                        name="rePasswordNew"
                        rules={Validate_Re_Password_Change}
                    >
                        <Input.Password placeholder="Nhập Lại Mật Khẩu Mới" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="button" htmlType="submit" className="btn btn-primary">
                            ĐỔI MẬT KHẨU
                        </Button>
                        <Popconfirm title="Xác nhận quên mật khẩu!" onConfirm={confirm} okText="Đồng ý" cancelText="Huỷ">
                            <Button type="button" className="btn btn-warning">
                                QUÊN MẬT KHẨU
                            </Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default ChangePassword;