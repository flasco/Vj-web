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
    
    if(props.match.params.id === undefined){
      console.log('比赛页面Jmp');
      this.cid = props.match.params.cid;
      this.qid = props.match.params.qid;
    }else{
      console.log('题库页面Jmp');
      this.qid = props.match.params.id;
    }

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
          cid={this.cid} qid={this.qid} />
      </div>
    );
  }

}

export default QueSubmit;