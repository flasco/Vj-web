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
    this.id = props.match.params.qid;
    this.stat = props.location.state;
    console.log(this.stat)
    this.type = this.stat.cid !== '' ? 2 : 1;
    this.cid = this.stat.cid;
    this.qid = this.stat.qid;
    this.oj = this.stat.oj;

    this.getSelectChild();
  }

  componentWillReceiveProps(nextProps) {
    if (this.id !== nextProps.match.params.qid) {
      this.id = nextProps.match.params.qid;
      this.stat = nextProps.location.state;
      this.qid = this.stat.qid;
      this.oj = this.stat.oj;
    }
    return true
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
          cid={this.cid} qid={this.qid} oj={this.oj} id={this.id} type={this.type}
          history={this.props.history} changePage={this.props.changePage} />
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