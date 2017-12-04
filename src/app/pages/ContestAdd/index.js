import React from 'react';

import ContestForm from './components/ContestForm';

class ContestAdd extends React.Component {
  constructor(props){
    super(props);
    if(props.location.state !== undefined){
      this.cid = props.location.state.cid;
    }
  }

  render() {
    return (
      <div>
        <h1 style={{marginBottom:24,textAlign:'center'}}>Contest Add</h1>
        <ContestForm cid={this.cid}/>
      </div>
    );

  }

}

export default ContestAdd;