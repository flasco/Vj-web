import React from 'react';
import FormX from './components/FormX'

import { getSelectChild } from '../../services/index'

import './index.css';

class QueSubmit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectChild: '',
    };
    
    this.proId = props.match.params.id;

    this.getSelectChild();
  }

  async getSelectChild() {
    const data = await getSelectChild();
    this.setState({
      selectChild: data,
    });
  }

  render() {
    return (
      <div className="queSubmit-container">
        <div className="queSubmit-head">
          <h1>Submit Your Solution</h1>
          <p>Current Authenticated Author : flasco</p>
        </div>
        <FormX selectChild={this.state.selectChild}
          proId={this.proId} />
      </div>
    );
  }

}

export default QueSubmit;