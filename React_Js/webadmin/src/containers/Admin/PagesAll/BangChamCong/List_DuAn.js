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
import {
  Link,
} from "react-router-dom";
import React, { useState } from 'react';
import DanhSachDuAn from './DanhSachDuAn';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
 
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));
const items = [
  getItem(<Link style={{textDecoration: "none" }} to={"/Danh-sach-cong-viec"}>Danh Sách Công Việc</Link>, '1', <AppstoreOutlined />),
  getItem('Báo Cáo', '2', <BarChartOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <VideoCameraOutlined />),

  
];

export default function List_DuAn() {
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
          {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })} */}
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `menu-item ${index + 1}`,
            }))}
          />
        </Header>
        <Content
          style={{
            margin: '70px 16px 10px 30vh',
          }}
        >
        <DanhSachDuAn/>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      </div>
    </Layout>
  )
}