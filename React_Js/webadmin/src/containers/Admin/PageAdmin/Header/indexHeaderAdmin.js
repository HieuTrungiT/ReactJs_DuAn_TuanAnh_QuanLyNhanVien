import { Layout, Avatar, Image, Dropdown , Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { menu } from '../../../../components/Menu/Menu_Navbar/index_menu';
import { API_GET_URL_IMAGE } from '../../../../api/index';
import fetchProducts from '../../../../Reducer/Fetch_API/getAccount';
import { getAccountMe } from '../../../../Reducer/Reducers/Auth/getAccountMe';
import { initAccountMe } from '../../../../Reducer/InitReducer/Auth/getAccountMe';
import React, { useEffect, useReducer } from 'react';
import './style_headerAdmin.scss'
const { Header } = Layout;

function IndexAdmin() {
    const [state, dispatch] = useReducer(getAccountMe, initAccountMe);
    const account = state.account;
    useEffect(() => {
        fetchProducts(dispatch);
        // const timer = window.setInterval(() => {
        //     fetchProducts(dispatch);
        //   }, 10000);
        //   return () => {
        //     window.clearInterval(timer);
        //   };
    }, []);

    return (
        <Header
            style={{
                position: 'fixed',
                zIndex: 1,
                width: '100%',
                paddingLeft: 200,
            }}
        >
            <div className="logo" />
            {/* <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['0']}
                items={new Array(3).fill(null).map((_, index) => ({
                    key: String(index + 1),
                    label: `nav ${index + 1}`,
                }))}
            ></Menu> */}
            <div style={{
                position: "fixed",
                right: 50,
                top: 0,
            }}>{account && account.map((value, index) => {
                const imgs = 'https://joeschmoe.io/api/v1/random'
                return (
                    <Avatar
                    key={index}
                    src={
                        <Image
                            size={64}
                            src={!value.image == "" ||!value.image == '' || !value.image == null || !value.image == undefined ? API_GET_URL_IMAGE +value.image : imgs}
                            style={{
                                width: "100%",
                                color: '#f56a00',
                                backgroundColor: '#fde3cf',
                            }}
                        />
                    }
                />
                )
            })}
                <Dropdown overlay={menu}>
                    <a style={{ marginLeft: '10px', textDecoration: "none" }}>
                        {account && account.map((value, index) => {
                            return (
                                <span key={index} className="name_in_avt">
                                    <span style={{ color: 'yellow' }}>{value.ten} (ADMIN)</span>
                                </span>
                            )
                        })}
                        <Space className="icon_img">
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </Header>
    );
}

export default IndexAdmin;