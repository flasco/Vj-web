import React from 'react';
import { Row, Col, Table, Input, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';
import xss from 'xss';

import { fetchQuesDet } from '../../services/index'

import './index.css';



class Panel extends React.Component {
  render() {
    if (this.props.desc !== undefined) {
      return (
        <div className="quesDet-Panel-block">
          <div className="quesDet-Panel-title">{this.props.name}</div>
          <div className="quesDet-Panel-content" dangerouslySetInnerHTML={{__html:this.props.desc}}/>
        </div>
      );
    } else {
      return false;
    }
  }
}

class QuesDet extends React.Component {
  constructor(props) {
    super(props);

    this.proId = props.match.params.id;
    this.state = {
      data: {},
      loading: true,
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    let d = await fetchQuesDet(this.proId);
    this.setState({ data: d, loading: false })
  }
  render() {
    if (this.state.loading) {
      return (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Spin size="large" />
        </div>
      );
    } else {
      return (
        <div className="quesDet-container">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ marginBottom: 10 }}>{this.state.data.title}</h1>
            <Icon type="clock-circle-o" style={{ marginRight: 4 }} /><span style={{ marginRight: 40, fontSize: 14 }}>{this.state.data.timeLimit}</span>
            <Icon type="appstore" style={{ marginRight: 4 }} /><span style={{ marginRight: 40, fontSize: 14 }}>{this.state.data.memoryLimit}</span>
          </div>

          <Panel name="Problem Description" desc={this.state.data.description} />
          <Panel name="Input" desc={this.state.data.input} />
          <Panel name="Output" desc={this.state.data.output} />
          <Panel name="Sample Input" desc={this.state.data.sampleInput} />
          <Panel name="Sample Output" desc={this.state.data.sampleOutput} />
          <Panel name="Author" desc={this.state.data.author} />
          <Panel name="Source" desc={this.state.data.source} />
          <Panel name="Hint" desc={this.state.data.hint} />
          <Panel name="Recommend" desc={this.state.data.recommend} />
          <div className="quesDet-ul">
            {/* <Link key="statistic" to={`./ques/statistic/${this.proId}`}>Statistic</Link> */}
            {/* <Link key="discuss" to={`./ques/discuss/${this.proId}`}>Discuss</Link> */}
            <Link key="submit" to={`./ques/submit/${this.proId}`}>提交</Link>
            <Link key="note" to={`./ques/note/${this.proId}`}>解题报告</Link>
            <Link key="return" to={`/main/ques`}>返回</Link>
          </div>
        </div>
      );
    }
  }
}

export default QuesDet;