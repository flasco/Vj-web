import React from 'react';


class ContestRank extends React.PureComponent{
  constructor(props){
    super(props);
    this.cid = props.match.params.cid;
    console.log(this.cid)
  }
  render(){
    return (
      <h1>Rank</h1>
    )
  }
}

export default ContestRank;