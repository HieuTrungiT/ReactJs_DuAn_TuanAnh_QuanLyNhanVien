import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import HearderUser from "../../Admin/PageAdmin/Header/indexHeaderUser"
import PageBangThongke from "./PageBangThongke"
import MenuNavigation from '../../pages/Menu/Menu_navigate/index_menu_User';
import {
  Link,
} from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
 
const items = [
  getItem(<Link style={{textDecoration: "none" }} to={"/Thong-Ke"}>Thống Kê111</Link>, '1', <AppstoreOutlined />),
  getItem('Nhân Viên', 'sub1', <UserOutlined />, [
    getItem(<Link style={{textDecoration: "none" }} to={"/Diem-danh"}>Điểm Danh</Link>, '3'),
    getItem(<Link style={{textDecoration: "none" }} to={"/Cong-viec"}>Công Việc</Link>, '4'),
    getItem(<Link style={{textDecoration: "none" }} to={"/Cong-viec/Bao-cao-cong-viec"}>Báo Cáo Công Việc</Link>, '5'),
  ])
];

export default function HOME() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout hasSider>
      <div>
      <MenuNavigation/>
      </div>
      <div>
      <Layout
        className="site-layout"
      >
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            paddingLeft: 200,
          }}
        >
<HearderUser/>

        </Header>

        
        <Content
           style={{
            margin: '70px 16px 10px 30vh',
          }}
        >
          <div
            className="site-layout-background"
          >
     <PageBangThongke/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
 
        </Footer>
      </Layout>
      </div>
    </Layout>
  )
}