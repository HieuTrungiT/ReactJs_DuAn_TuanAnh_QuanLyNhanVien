import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>404</h1>
			</div>
			<h2>Khoan đã ! Đường dẫn này không tồn tại</h2>
			<p>XIN LỖI NHƯNG TRANG BẠN ĐANG TÌM KIẾM KHÔNG TỒN TẠI HOẶC ĐÃ BỊ XÓA. TÊN ĐÃ THAY ĐỔI HOẶC TẠM THỜI KHÔNG THỂ SỬ DỤNG</p>
			<Link to="/" >Trở Về Trang Chủ</Link> 
		</div>
	</div>
);

export default NotFound;