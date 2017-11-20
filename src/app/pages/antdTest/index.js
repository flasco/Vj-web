import React from 'react';

import { Button } from 'antd';

import './index.css';

class AndtTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="antTst-container">
        <div style={{ marginTop: 12 }} />
        <div style={{ textAlign:'center' }}>
          <span>这里是测试语句~</span>
          <br /><br />
          <Button type="primary">Button</Button>
        </div>
      </div>
    );
  }
}

export default AndtTest;