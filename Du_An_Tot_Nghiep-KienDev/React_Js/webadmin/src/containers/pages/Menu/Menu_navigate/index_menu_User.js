import { Layout, Menu } from 'antd';
import React from 'react';
import { items_admin, highlight } from '../../../../components/Menu/Menu_navigate/index_menu_user';
import './index_menu_user.scss';
const { Sider } = Layout;

export default function MenuNavigation() {
  return (
    <Sider className="ant-menu-slide-user" collapsible>
      <Menu className='ant-menu'
        theme="dark"
        mode="inline"
        selectedKeys={highlight()}
        defaultSelectedKeys={["2"]}
        items={items_admin} />
    </Sider>
  );
}