import React from 'react';

import './index.css';

class UserBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  userQuit = () => {
    this.props.setUsertype(false);
    this.props.setMouse(true);
  }

  render() {
    return (
      <div className="userboard-container" style={{ visibility: this.props.userBoardHover ? 'hidden' : false }}
        onMouseOut={this.props.onMouseOut}>
        <div className="userboard-container-inner" onMouseOver={this.props.onMouseOver}
          style={{ visibility: this.props.userBoardHover ? 'hidden' : false }} >
          <img src={this.props.header} className="userboard-header" alt="flasco" />
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
          <a className="userboard-quit" onClick={this.userQuit}>安全退出</a>
        </div>
      </div>

    );
  }
}

export default UserBoard;