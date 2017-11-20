import React from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: [props.location.pathname.slice(1)],
    }
  }

  render() {
    let key = window.location.pathname.split('/')[1] || 'index';
    return (
      <Layout className="layout">
        <Header>
          <div className="logo"><span>美食爱好者</span></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={this.state.selectedKeys}
            selectedKeys={[key]}
            style={{ lineHeight: '64px', float: 'right' }}
          >
            <Menu.Item key="index"><Link to="/">公告</Link></Menu.Item>
            <Menu.Item key="discuss"><Link to="/discuss">讨论</Link></Menu.Item>
            <Menu.Item key="antdTest"><Link to="/antdTest">测试</Link></Menu.Item>
            <Menu.Item key="about"><Link to="/about">关于</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', marginTop: 32, padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2017 Created by flasco
      </Footer>
      </Layout>
    );
  }
}

export default withRouter(Nav);