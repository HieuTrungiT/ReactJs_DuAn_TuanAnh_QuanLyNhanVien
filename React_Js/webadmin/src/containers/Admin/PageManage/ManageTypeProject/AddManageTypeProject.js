import { Modal, Form, Input } from 'antd';
import { Validate_required, } from '../../../../components/Validate/CheckValidate'
import React, { useReducer } from 'react';
import { FullStateManagament } from '../../../../Reducer/InitReducer/Managament/indexManagament';
import * as Reducer from '../../../../Reducer/Reducers/Managament/ProjectManagement';
import * as typeAPI from '../../../../Reducer/Fetch_API/ApiTypeProject';
import { DATE_TIME } from '../../../../components/DateTime/DateTime';

const { TextArea } = Input;
export default function AddManageTypeProject({ setModalAdd, modalAdd }) {
    const [form] = Form.useForm();
    const [state, dispatch] = useReducer(Reducer.setAddTypeProjectMana, FullStateManagament);

    const onsubmitSuccess = (values) => {
        values.timeRegister = DATE_TIME;
        typeAPI.setAddTypeProject({ dispatch, values });
    };

    {
        state.message === true && setTimeout(() => {
            setModalAdd(false)
        }, 1500)
    }
    return (
        <>
            <Modal title="Thêm Loại Dự Án"
                open={modalAdd}
                onOk={form.submit}
                onCancel={() => setModalAdd(false)}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onsubmitSuccess}
                >
                    <Form.Item
                        label="Tên Loại Dự Án"
                        name="nameTypeProject"
                        rules={Validate_required}
                    >
                        <Input placeholder="Nhập Tên Loại Dự Án" />
                    </Form.Item>
                    <Form.Item
                        label="Mô Tả Loại Dự Án"
                        name="describeTypeProject"
                    >
                        <TextArea rows={4} placeholder="Nhập Mô Tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};