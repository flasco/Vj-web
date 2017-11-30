import React from 'react';
import FormX from './components/FormX'
import { connect } from 'react-redux';

import { getSelectChild } from '../../services/index'

import './index.css';

class QueSubmit extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectChild: '',
    };
    if (props.match.params.id === undefined) {
      // console.log('比赛页面Jmp');
      this.cid = props.match.params.cid;
      this.qid = props.match.params.qid;
      this.type = 2;
    } else {
      // console.log('题库页面Jmp');
      this.cid = props.match.params.oj;
      this.qid = props.match.params.id;
      this.type = 1;
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
          <p>Current Authenticated Author : {this.props.userName || 'Stranger'}</p>
        </div>
        <FormX selectChild={this.state.selectChild}
          cid={this.cid} qid={this.qid} type={this.type} history={this.props.history}/>
      </div>
    );
  }

}

function select(state) {
  return {
    isLogin: state.user.isLogin,
    userName: state.user.userName,
  };
}

export default connect(select)(QueSubmit);