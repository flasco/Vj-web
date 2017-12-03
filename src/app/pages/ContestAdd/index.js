import React from 'react';

import ContestForm from './components/ContestForm';

class ContestAdd extends React.Component {
  constructor(props) {
    super(props);



  }

  render() {
    return (
      <div>
        <h1 style={{marginBottom:24,textAlign:'center'}}>Contest Add</h1>
        <ContestForm />
      </div>
    );

  }

}

export default ContestAdd;