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
 
  getItem(<Link style={{ textDecoration: "none" }} to={"/Thong-Ke"}>Thống Kê</Link>, '1', <AreaChartOutlined />, "",),
  getItem('Nhân Viên', 'sub0', <UserSwitchOutlined />, [
    getItem(<Link style={{textDecoration: "none" }} to={"/Diem-danh"}>Điểm Danh</Link>, '2'),
    getItem(<Link style={{textDecoration: "none" }} to={"/Cong-viec"}>Công Việc</Link>, '3'),
    getItem(<Link style={{textDecoration: "none" }} to={"/Cong-viec/Bao-cao-cong-viec"}>Báo Cáo Công Việc</Link>, '4'),
  ]),
 
 

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
