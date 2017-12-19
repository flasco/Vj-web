import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import ContestForm from './components/ContestForm';

import { createContest,updateContest } from '../../services/contest';
import NoPermisson from '../../components/NoPermisson';

class ContestAdd extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.state !== undefined) {
      this.cid = props.location.state.cid;
    }
  }
  submit = async (values) => {
    let data = '';
    if(this.props.location.state === undefined){
      data = await createContest({
        ...values,
        userId: this.props.uid
      });
    }else{
      // console.log(values);
      data = await updateContest({
        ...values,
        userId: this.props.uid,
        id:this.cid,
      },this.cid);
    }

    if (data.success === 1) {
      message.success('create Success!');
      this.props.history.push('/main/contest')
    }
    else message.error('create failed!');
    
  }

  render() {
    if (!this.props.isLogin) {
      return <NoPermisson history={this.props.history} />
    }
    return (
      <div>
        <h1 style={{ marginBottom: 24, textAlign: 'center' }}>Contest Create</h1>
        <ContestForm cid={this.cid} submit={this.submit} />
      </div>
    );
  }
}

function select(state) {
  return {
    uid: state.user.id,
    isLogin: state.user.isLogin,
  };
}

export default connect(select)(ContestAdd);