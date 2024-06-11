import { useState } from 'react';
import { Button, Col, Layout, Menu, Row, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UpOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import publicRouter from '../Router';
import './../../App.css'
import AccountInfo from '../../scenes/AccountInfo';
import ScrollToTop from 'react-scroll-to-top';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider breakpoint="lg" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250}>
                <div className="demo-logo-vertical">Library</div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={publicRouter}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Row>
                        <Col span={4}>
                            <Button
                                className='button-collapsed'
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                            />
                        </Col>
                        <Col span={20} className='header-col-right-user'>
                            <AccountInfo />
                        </Col>
                    </Row>
                </Header>
                <Content style={{ margin: '20px 20px', backgroundColor: '#F0F0F0' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Design by <strong>Đào Đức Hưng</strong>
                </Footer>
            </Layout>
            <ScrollToTop
                style={{ borderRadius: '50%', border: '2px solid #0958d9' }}
                smooth
                top={200}
                component={<UpOutlined style={{ fontSize: 18, color: '#0958d9' }} title='Chuyển đến đầu trang'/>}
            />
        </Layout>
    );
};

export default MainLayout;
