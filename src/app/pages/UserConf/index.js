import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import ConfForm from './components/ConfForm'
class UserShow extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col><h1 style={{ textAlign: 'center', marginBottom: 24 }}>My Infomation</h1></Col>
          <Col><Link key="show" to="./show" style={{lineHeight: '36px',marginLeft:20}}>Visitor Watch</Link></Col>
        </Row>
        <ConfForm />
      </div>
    );
  }
}

export default UserShow;