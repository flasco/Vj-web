import React from 'react';
import { Row, Col, Table, Input } from 'antd';
import { Link } from 'react-router-dom';

import './index.css';

let data = {
  title: 'A + B Problem',
  subTitle: 'Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)<br/>Total Submission(s): 713880    Accepted Submission(s): 220407',
  proDesc: 'Calculate A + B.',
  input: 'Each line will contain two integers A and B. Process to end of file.',
  output: 'For each case, output A + B in one line.',
  sampleInput: '1 1',
  sampleOutput: '2',
  author: 'HDOJ',
  recommend: ''
};

class Panel extends React.Component {
  render() {
    return (
      <div className="quesDet-Panel-block">
        <div className="quesDet-Panel-title">{this.props.name}</div>
        <div className="quesDet-Panel-content">{this.props.desc}</div>
      </div>
    );
  }
}

class QuesDet extends React.Component {
  constructor(props) {
    super(props);

    this.proId = props.match.params.id;
    this.state = {

    }
  }
  render() {
    return (
      <div className="quesDet-container">
        <h1 style={{ textAlign: 'center' }}>{data.title}</h1>
        <div style={{ textAlign: 'center', display: 'block' }}><span dangerouslySetInnerHTML={{ __html: data.subTitle }} /></div>
        
        <Panel name="Problem Description" desc={data.proDesc} />
        <Panel name="Input" desc={data.input}/>
        <Panel name="Output" desc={data.output}/>
        <Panel name="Sample Input" desc={data.sampleInput}/>
        <Panel name="Sample Output" desc={data.sampleOutput}/>
        <Panel name="Author" desc={data.author}/>
        <Panel name="Recommend" desc={data.recommend}/>
        <div >
          <Link key="statistic" to={`./ques/statistic/${this.proId}`}>Statistic</Link>
          <Link key="submit" to={`./ques/submit/${this.proId}`}>Submit</Link>
          <Link key="discuss" to={`./ques/discuss/${this.proId}`}>Discuss</Link>
          <Link key="note" to={`./ques/note/${this.proId}`}>Note</Link>
        </div>
      </div>
    );
  }
}

export default QuesDet;