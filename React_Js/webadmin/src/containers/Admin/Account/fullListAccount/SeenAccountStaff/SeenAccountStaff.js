import { Modal, Form, Input, Avatar, Row, Col, } from 'antd';
import { API_GET_URL_IMAGE, API_GET_URL_IMAGE_USER_OUTLINE } from '../../../../../api/index'
import React from 'react';
import './SeenAccountStaff.scss';
import moment from 'moment';
export default function SeenAccountStaff({ setSeenModal, seenModal, list }) {
    const datelogin = moment(list.timelogin).format("YYYY-MM-DD")
    const timelogin = moment(list.timelogin).format("HH:mm:ss")
    const datetime = datelogin + " lúc " + timelogin;
    return (
        <>
            <Modal title={`Nhân viên : ${list.ten}`} open={seenModal} width={1000} footer={null} onCancel={() => setSeenModal(false)}>
                <Form layout="vertical">
                    <Row className='form-col-seen-user'>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Mã số nhân viên"
                                name="idstaff"
                                initialValue={`000${list.id}`}
                            >
                                <Input placeholder="Tên nhân viên" disabled />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Tên nhân viên"
                                name="namestaff"
                                initialValue={list.ten || "Tên nhân viên chưa cập nhật"}
                            >
                                <Input placeholder="Tên nhân viên" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="imgstaff"
                    >
                        <Avatar
                            style={{ width: '105px', height: '105px' }}
                            shape="square"
                            src={!list.image == "" || !list.image == '' || !list.image == null || !list.image == undefined ? API_GET_URL_IMAGE + list.image : API_GET_URL_IMAGE_USER_OUTLINE}
                        />
                    </Form.Item>
                    <Row className='form-col-seen-user'>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Số điện thoại nhân viên"
                                name="phonestaff"
                                initialValue={list.sdt || "Số điện thoại nhân viên chưa cập nhật"}
                            >
                                <Input placeholder="Số điện thoại nhân viên" disabled />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Email nhân viên"
                                name="emailstaff"
                                initialValue={list.email || "Email nhân viên chưa cập nhật"}
                            >
                                <Input placeholder="Email nhân viên" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='form-col-seen-user'>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Ngày sinh nhân viên"
                                name="birthdaystaff"
                                initialValue={list.date || "Ngày sinh nhân viên chưa cập nhật"}
                            >
                                <Input placeholder="Ngày sinh nhân viên" disabled />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Giới tính nhân viên"
                                name="genderstaff"
                                initialValue={list.gioitinh === "1" ? "Nam" : list.gioitinh === "2" ? "Nữ" : "Khác"}
                            >
                                <Input placeholder="Giới tính nhân viên" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='form-col-seen-user'>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Địa chỉ nhân viên"
                                name="mapstaff"
                                initialValue={list.diachi || "Địa chỉ nhân viên chưa cập nhật"}
                            >
                                <Input placeholder="Địa chỉ nhân viên" disabled />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Chức vụ nhân viên"
                                name="positionstaff"
                                initialValue={list.chucvu || "Nhân viên"}
                            >
                                <Input placeholder="Chức vụ nhân viên" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='form-col-seen-user'>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Thời gian đăng nhập gần nhất"
                                name="timeloginstaff"
                                initialValue={datetime}
                            >
                                <Input placeholder="Thời gian đăng nhập gần nhất" disabled />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Trạng thái tài khoản"
                                name="accountstaff"
                                initialValue={list.lockacc === 0 ? "Bình thường" : list.lockacc === 1 ? "Chưa duyệt" : "Tài khoản bị khoá"}
                            >
                                <Input placeholder="Tình trạng tài khoản nhân viên" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};