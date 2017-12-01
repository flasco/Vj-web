import React from 'react';
// import { Row, Col, Table, Input } from 'antd';
// import { Link } from 'react-router-dom';

import './index.css';

class QuesNote extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {

    };

    if (this.p1 = props.match.params.uid) {
      this.type = 1; //这里是用户的列表
    } else if (this.p1 = props.match.params.oj) {
      this.type = 2; //这里是题库题目的题解跳转。
      this.p2 = props.match.params.id;
    }

  }
  render(){
    return(
      <div>
        <h1>这里是解题报告的详情</h1>
      </div>
    );
  }

}

export default QuesNote;