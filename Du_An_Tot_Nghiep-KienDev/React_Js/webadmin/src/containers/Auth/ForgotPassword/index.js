import { Modal, Form, Input } from 'antd';
import React, { useReducer } from 'react';
// import ReCAPTCHA from "react-google-recaptcha";
import ReCAPTCHA from 'react-google-recaptcha';
import { Validate_Email, } from '../../../components/Validate/CheckValidate';
import { WarningCaptcha, } from '../../../components/Message/Warning';
import { DATE_TIME } from '../../../components/DateTime/DateTime';
import { ForgotPassword } from '../../../Reducer/InitReducer/Auth/initNew';
import { Succ_ForgotPw } from '../../../Reducer/Reducers/Auth';
import { SetJobForgotPassword } from '../../../Reducer/Actions/Auth/index';


const ForgotPw = ({ setOpenModal, OpenModal, }) => {
  const [form] = Form.useForm();
  const [state, dispatch] = useReducer(Succ_ForgotPw, ForgotPassword);

  const onsubmitSuccess = (values) => {
    // if (values.captcha === undefined || values.captcha === null || values.captcha === "") {
    //   WarningCaptcha();
    //   return false;
    // }
    values.dateTime = DATE_TIME;
    dispatch(SetJobForgotPassword(values))
  };

  return (
    <>
      <Modal
        title="Đặt lại mật khẩu"
        visible={OpenModal}
        onOk={form.submit}
        onCancel={() => setOpenModal(false)}
      >
        <Form
          form={form}
          onFinish={onsubmitSuccess}>

          <p>Để lấy lại mật khẩu , bạn vui lòng cung cấp email</p>
          <Form.Item
            name="email"
            rules={Validate_Email}
          >
            <Input placeholder="Nhập Email Đăng Nhập Của Bạn" />
          </Form.Item>

          {/* <Form.Item
            name="captcha"
            valuePropName="checked"
          >
            <ReCAPTCHA className="ReCAPTCHA"
            sitekey='6LdmoUEhAAAAACqtptaVuYqUJ-mV7_vDEk-VKMIP'></ReCAPTCHA>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default ForgotPw;