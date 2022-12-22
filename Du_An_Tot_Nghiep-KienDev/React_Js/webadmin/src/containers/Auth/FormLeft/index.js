import './index.scss';
import logo from '../../../public/logo/logo.png';
import image from '../../../public/icon/1.svg';
import { Link, useLocation } from "react-router-dom";

function LoginLeft() {
    const location = useLocation();
    return (
        <div className="Background-full-left">
            <div className="icon-logo">
                <a href='/'>
                    <img src={logo} ></img >
                </a>
            </div>
            <div className="background-image">
                <img src={image} ></img >
            </div>
            {location.pathname == "/dang-nhap" ?
                <>
                    <h2>Bạn chưa có tài khoản ?</h2>
                    <Link to="/dang-ky">
                        <button type="button" className="btn btn-primary btn-lg">ĐĂNG KÝ NGAY</button>
                    </Link>
                </>
                :
                <>
                    <h2>Bạn đã có tài khoản ?</h2>
                    <Link to="/dang-nhap">
                        <button type="button" className="btn btn-success btn-lg">ĐĂNG NHẬP NGAY</button>
                    </Link>
                </>
            }
        </div>
    );
}

export default LoginLeft;