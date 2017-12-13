import React from 'react';
import { connect } from 'react-redux';

import ContestForm from './components/ContestForm';

import { createContest } from '../../services/contest';
import NoPermisson from '../../components/NoPermisson';

class ContestAdd extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.state !== undefined) {
      this.cid = props.location.state.cid;
    }
  }
  submit = async (values) => {

    const data = await createContest({
      ...values,
      userId:this.props.uid
    });
    console.log(data);
  }

  render() {
    if(!this.props.isLogin){
      return <NoPermisson history={this.props.history}/>
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