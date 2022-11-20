import { Col, Row } from 'antd';
import ManageAccountBan from './ManageAccountBan/manageAccountBan'
import StatisticalAccount from './StatisticalAccount/StatisticalAccount'
import ForgetAccount from './ForgetAccount/ForgetAccount'
import React from 'react';
import './ManageAccount.scss'
const ManageAccount = () => {
    return (
        <>
            <Row className='Home-ManageAccount'>
                <Col lg={16} md={24} sm={24} xs={24} className="ManageAccount_Bg">
                    <ManageAccountBan />
                </Col>
                <Col lg={7} md={24} sm={24} xs={24} className="ManageAccount_Bg">
                    <StatisticalAccount />
                </Col>
            </Row>
            <Row className='Home-ManageAccount' style={{paddingTop:'20px'}}>
                <Col span={24}>
                    <ForgetAccount/>
                </Col>
            </Row>
        </>
    )
}
export default ManageAccount;