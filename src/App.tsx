import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Layout, Menu, Row, theme } from 'antd';
import publicRouter from './components/Router';
import PageContent from './components/Router/router.config';
import { useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import './App.css'

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
   const [collapsed, setCollapsed] = useState(false);
   const navigate = useNavigate();
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   return (
      <Layout style={{ minHeight: '100vh' }}>
         <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
                  <Col span={12}>
                     <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                           fontSize: '16px',
                           width: 64,
                           height: 64,
                        }}
                     />
                  </Col>
                  <Col span={12} className='header-col-right-user'>
                     <FaRegCircleUser style={{ width: 20, height: 20, marginRight: 8 }} />
                     <span style={{ marginRight: 16 }}>Đào Đức Hưng</span>
                  </Col>
               </Row>
            </Header>
            <Content style={{ margin: '16px 16px' }}>
               {/* <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
               </Breadcrumb> */}
               <div
                  style={{
                     padding: 24,
                     minHeight: 360,
                     background: colorBgContainer,
                     borderRadius: borderRadiusLG,
                  }}
               >
                  <PageContent />
               </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
               Design by <strong>Dao Duc Hung</strong>
            </Footer>
         </Layout>
      </Layout>
   );
};

export default App;
