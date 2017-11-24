import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';

import LoginWindow from '../LoginWindow';

import './index.css';

const { Header, Content, Footer } = Layout;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.floatFlag = false;
    this.state = {
      selectedKey: [props.location.pathname.slice(1)],
      userBoardHover: true,
      isloginBoard: false,
      isLogin: false,
      windowType:1,
    }
  }
  onMouseEnter = () => {
    this.state.isLogin && this.setState({
      userBoardHover: false,
    });
  }

  openLoginWindow = (type) => { // type = 1 打开登录界面， type = 2 打开注册界面。
    this.state.isLogin || this.setState({
      isloginBoard: true,
      windowType:type
    });
  }

  closeLoginWindow = () => {
    this.state.isLogin || this.setState({
      isloginBoard: false,
    });
  }

  onMouseLeave = () => {
    this.state.isLogin && this.setState({
      userBoardHover: true,
    });
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
          <div className={this.state.isLogin ? "Nav-head" : "Nav-head Nav-head-no-sign"} onMouseOver={this.onMouseEnter} onMouseOut={this.onMouseLeave}>
            {this.state.isLogin ? <Avatar icon="user" className="Nav-Ava" size="large" onMouseOver={this.onMouseEnter} /> :
              <div>
                <a onClick={this.openLoginWindow.bind(this, 1)}>登录</a>
                <a onClick={this.openLoginWindow.bind(this, 2)}>注册</a>
              </div>}
          </div>
          {this.state.isloginBoard && <LoginWindow
            isloginBoard={this.state.isloginBoard}
            closeLoginWindow={this.closeLoginWindow}
            windowType={this.state.windowType} />}
          <div className="user-card" onMouseOut={this.onMouseLeave}>
            <div className="Nav-board" onMouseOver={this.onMouseEnter}
              style={{ visibility: this.state.userBoardHover ? 'hidden' : false }} >
              <span>欢迎您，Flasco</span>
            </div>
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