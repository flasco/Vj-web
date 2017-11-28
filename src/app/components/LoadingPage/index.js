
import React from 'react';
import { Spin } from 'antd';

class LoadingPage extends React.PureComponent {
  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Spin size="large" />
      </div>
    );
  }
}

export default LoadingPage;

