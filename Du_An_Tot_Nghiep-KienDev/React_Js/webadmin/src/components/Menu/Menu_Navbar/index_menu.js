import { Menu } from 'antd';
import { UserOutlined, UserSwitchOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import React from 'react';

const HandleMenuClick = (e) => {
    const key = e.key;
    { key === "3" && localStorage.removeItem("Save_Login") }
};

export const menu = (
    <Menu
        onClick={HandleMenuClick}
        items={[
            {
                label: <Link style={{ textDecoration: "none" }} to={"/thong-tin-ca-nhan"}>Thông Tin Cá Nhân</Link>,
                key: '1',
                icon: <UserOutlined />,
            },
            {
                label: <Link style={{ textDecoration: "none" }} to={"/doi-mat-khau"}>Đổi Mật Khẩu</Link>,
                key: '2',
                icon: <UserSwitchOutlined />,
            },
            {
                label:<a style={{ textDecoration: "none" }} href="/">Đăng Xuất</a>,
                key: '3',
                icon: <LogoutOutlined />,
            },
        ]}
    />
);