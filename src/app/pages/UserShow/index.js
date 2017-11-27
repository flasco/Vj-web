import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import ShowForm from './components/ShowForm'
class UserShow extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col><h1 style={{ textAlign: 'center', marginBottom: 24 }}>Persional Infomation</h1></Col>
          <Col><Link key="setting" to="./setting" style={{ lineHeight: '36px', marginLeft: 20 }}>Setting</Link></Col>
        </Row>
        <ShowForm />
      </div>
    );
  }
}

export default UserShow;