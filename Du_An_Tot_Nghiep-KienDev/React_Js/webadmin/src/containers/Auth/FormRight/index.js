import './index.scss';
import { useLocation } from "react-router-dom";
import React from 'react';
import 'antd/dist/antd.css';
import Login from './Login/index';
import Register from './Register/index';

function LoginRight() {
    const location = useLocation();
    return (
        <div className="Background-full-right">
            <div className='content-list'>
                {location.pathname === "/dang-nhap" ?
                    <h2>Đăng Nhập Tài Khoản Nhân Viên</h2>
                    :
                    <>
                        <h2>Đăng Ký Tài Khoản Nhân Viên</h2>
                        <p style={{ color: "black" }}>Nhiều nhân viên tiềm năng đang làm việc tại Quốc Hưng</p>
                    </>
                }
                {location.pathname === "/dang-nhap" ?
                    <Login />
                    :
                    <Register />
                }
            </div>
        </div>
    );
}

export default LoginRight;