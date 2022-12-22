import Header from '../PageAdmin/Header/indexHeaderAdmin';
import MenuNavigation from '../../pages/Menu/Menu_navigate/index_menu';
import Footer from '../PageAdmin/Footer/indexFooterAdmin';
import { Layout } from 'antd';
const { Content } = Layout;

export default function DefaultLayout({ children }) {
    return (
        <Layout hasSider>
            <MenuNavigation />
            <Layout>
                <Header />
                <div
                style={{
                    padding:'0 0 0 10px',
                    height: "100vh",
                    width: "100%",
                    overflowY: "auto",
                }}>
                    <Content style={{ margin: '70px 16px 10px 0px' }}>
                        {children}
                    </Content>
                    <Footer />
                </div>
            </Layout>
        </Layout >
    );
}