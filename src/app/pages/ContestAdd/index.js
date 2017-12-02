import React from 'react';

import ContestForm from './components/ContestForm';

class ContestAdd extends React.Component {
  constructor(props) {
    super(props);



  }

  render() {
    return (
      <div>
        <h1>这里是比赛添加界面</h1>
        <ContestForm />
      </div>
    );

  }

}

export default ContestAdd;