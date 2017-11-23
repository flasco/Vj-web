import React from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
const { Header, Content, Footer } = Layout;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: [props.location.pathname.slice(1)],
    }
  }

  render() {
    let key = window.location.pathname.split('/')[2] || '';
    return (
      <Layout className="layout">
        <Header>
          <div className="Nav-logo"><span>Virtual Judge</span></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={this.state.selectedKeys}
            selectedKeys={[key]}
            style={{ lineHeight: '64px', float: 'left' }}
          >
            <Menu.Item key="info"><Link to="/main/info">资讯</Link></Menu.Item>
            <Menu.Item key="ques"><Link to="/main/ques">题库</Link></Menu.Item>
            <Menu.Item key="contest"><Link to="/main/contest">比赛</Link></Menu.Item>
            <Menu.Item key="rank"><Link to="/main/rank">排名</Link></Menu.Item>
          </Menu>
          <div className="Nav-head">
            <Avatar icon="user" className="Nav-Ava" size="large"/>
          </div>
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