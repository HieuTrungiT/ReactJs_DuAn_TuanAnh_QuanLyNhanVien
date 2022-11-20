import {
  SettingOutlined,
  UserSwitchOutlined,
  AreaChartOutlined,
  FundProjectionScreenOutlined,
  OrderedListOutlined
} from '@ant-design/icons';
import {
  Link,
} from "react-router-dom";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const items_admin = [
  getItem(<Link style={{ textDecoration: "none" }} to={"/"}>Thống Kê</Link>, '1', <AreaChartOutlined />, "",),
  getItem('Nhân Viên', 'sub0', <UserSwitchOutlined />, [
    getItem(<Link style={{ textDecoration: "none" }} to={"/danh-sach-nhan-vien"}>Danh Sách Nhân Viên</Link>, '2'),
    getItem(<Link style={{ textDecoration: "none" }} to={"/dang-ky-moi"}>Đăng Ký Mới</Link>, '3'),
    getItem(<Link style={{ textDecoration: "none" }} to={"/quan-ly-tai-khoan"}>Quản Lý Tài Khoản</Link>, '4'),
  ]),
  getItem('Dự Án', 'sub1', <FundProjectionScreenOutlined />, [
    getItem(<Link style={{ textDecoration: "none" }} to={"/danh-sach-du-an"}>Danh Sách Dự Án</Link>, '5'),
    getItem('Hoạt Động Dự Án', '6'),
  ]),
  getItem('Quản Lý', 'sub2', <OrderedListOutlined />, [
    getItem('Quản Lý Chấm Công', '7'),
    getItem('Quản Lý Nhân Viên', '8'),
    getItem('Quản Lý Thời Gian', '9'),
    getItem(<Link style={{ textDecoration: "none" }} to={"/quan-ly-nhom"}>Quản Lý Nhóm</Link>, '10'),
    getItem(<Link style={{ textDecoration: "none" }} to={"/quan-ly-loai-du-an"}>Quản Lý Loại Dự Án</Link>, '11'),
  ]),
  getItem('Cài Đặt', '12', <SettingOutlined />),
  getItem('', '999'),

]

export const highlight = () => {
  const selectedKey = window.location.pathname;
  switch (selectedKey) {
    case '/':
      return ['1']
    case '/danh-sach-nhan-vien':
      return ['2']
    case '/dang-ky-moi':
      return ['3']
    case '/quan-ly-tai-khoan':
      return ['4']
    case '/danh-sach-du-an':
      return ['5']
    case '/danh-sach-du-an/them-du-an':
      return ['5']
    case '/quan-ly-loai-du-an':
      return ['11']
    case '/quan-ly-nhom':
      return ['10']
    case '/quan-ly-nhom/them-nhom-moi':
      return ['10']
    default:
      return ['1']
  }
}