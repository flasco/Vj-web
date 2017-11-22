import React from 'react';
// import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import FormX from './components/FormX'

import './index.css';

class QueSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    return (
      <div className="queSubmit-container">
        <div className="queSubmit-head">
          <h1>Submit Your Solution</h1>
          <p>Current Authenticated Author : flasco</p>
        </div>
        <FormX />
      </div>
    );
  }

}

export default QueSubmit;