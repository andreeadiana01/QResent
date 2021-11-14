import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CalendarOutlined,
  FileOutlined,
} from '@ant-design/icons';


const { Header, Sider, Content } = Layout;

class MainMenu extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<FileOutlined />}>
            Administration
            </Menu.Item>
            <Menu.Item key="2" icon={<CalendarOutlined />}>
            My classes
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 10 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 54,
              minHeight: window.innerHeight - 50,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainMenu