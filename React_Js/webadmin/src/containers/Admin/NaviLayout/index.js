import MenuNavigation from '../../pages/Menu/Menu_navigate/index_menu';
import Footer from '../PageAdmin/Footer/indexFooterAdmin';
import { Layout } from 'antd';
const { Content } = Layout;

export default function NaviLayout({ children }) {
    return (
        <Layout hasSider>
            <MenuNavigation />
            <Layout >
                <Content style={{ margin: '0px 16px 10px 30vh'}}>
                    {children}
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
}