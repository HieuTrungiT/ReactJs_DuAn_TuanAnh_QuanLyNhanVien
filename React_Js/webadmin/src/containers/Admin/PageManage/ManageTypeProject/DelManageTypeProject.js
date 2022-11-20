import { Modal, Form, Input } from 'antd';
import { Validate_required, } from '../../../../components/Validate/CheckValidate'
import React, { useReducer } from 'react';
import { FullStateManagament } from '../../../../Reducer/InitReducer/Managament/indexManagament';
import * as Reducer from '../../../../Reducer/Reducers/Managament/ProjectManagement';
import * as typeAPI from '../../../../Reducer/Fetch_API/ApiTypeProject';
import { DATE_TIME } from '../../../../components/DateTime/DateTime';

const { TextArea } = Input;
export default function AddManageTypeProject({ setModalDel, modalDel, data }) {
    const [form] = Form.useForm();
    const [state, dispatch] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament);

    const onsubmitSuccess = (values) => {
        values.timeRegister = DATE_TIME;
        values.id = data.id;
        typeAPI.setUpdateTypeProject({ dispatch, values });
    };

    {
        state.message === true && setTimeout(() => {
            setModalDel(false)
        }, 1500)
    }
    return (
        <>
            <Modal title="Cập Nhật Loại Loại Dự Án"
                open={modalDel}
                onOk={form.submit}
                onCancel={() => setModalDel(false)}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onsubmitSuccess}
                >
                    <Form.Item
                        label="Tên Loại Dự Án"
                        name="nameTypeProject"
                        rules={Validate_required}
                        initialValue={data.tenduan}
                    >
                        <Input placeholder="Nhập Tên Loại Dự Án" />
                    </Form.Item>
                    <Form.Item
                        label="Mô Tả Loại Dự Án"
                        name="describeTypeProject"
                        initialValue={data.motaduan}
                    >
                        <TextArea rows={4} placeholder="Nhập Mô Tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};