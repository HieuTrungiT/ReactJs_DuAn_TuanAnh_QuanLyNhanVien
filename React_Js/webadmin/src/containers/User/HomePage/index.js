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
  getItem('Thống Kê', '1', <AppstoreOutlined />),
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
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            paddingTop: '62px',
          }}

        
          // collapsible 
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} onClick={e => console.log(e)} />

        </Sider>
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