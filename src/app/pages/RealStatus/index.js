import React from 'react';
// import { Form, Row, Col, Input, Button } from 'antd';
// import { Link } from 'react-router-dom';
import SelectForm from './components/SelectForm';
import './index.css';

class RealSuatus extends React.Component {
  search = (values) => {
    console.log(values);
  }
  render() {
    return (
      <div>
        <h1 style={{textAlign:'center',marginBottom:14}}>Realtime Status</h1>
        <SelectForm search={this.search} />

      </div>

    );
  }
}

export default RealSuatus;