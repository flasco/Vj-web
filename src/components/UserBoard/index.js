import React from 'react';

import header from '../../app/assert/header.jpg';

import './index.css';

class UserBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div>
        <img src={header} className="userboard-header" alt="flasco" />
        <div className="userboard-first-right" style={{ float: 'left', marginTop: 13, lineHeight: 'normal' }}>
          <span className="userboard-name">Flasco</span>
          <div className="userboard-meta">
            <a>解题数 <b>147</b></a>
            <a>做题数 <b>458</b></a>
          </div>
        </div>
        <ul className="userboard-items">
          <li><span>解题报告</span></li>
          <li><span>个人中心</span></li>
        </ul>
        <a className="userboard-quit" onClick={this.props.userQuit}>安全退出</a>
      </div>
    );
  }
}

export default UserBoard;