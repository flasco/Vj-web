import React from 'react';

import ContestForm from './components/ContestForm';

import { createContest } from '../../services/contest';

class ContestAdd extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.state !== undefined) {
      this.cid = props.location.state.cid;
    }
  }
  submit = async (values) => {
    const data = await createContest(values);
    console.log(data);
  }
  render() {
    return (
      <div>
        <h1 style={{ marginBottom: 24, textAlign: 'center' }}>Contest Create</h1>
        <ContestForm cid={this.cid} submit={this.submit} />
      </div>
    );
  }

}

export default ContestAdd;