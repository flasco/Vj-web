import React from 'react';
import { Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';

import { fetchQuesDet } from '../../services/index'

import Panel from './components/Panel';

import './index.css';

class QuesDet extends React.Component {
  constructor(props) {
    super(props);

    this.proId = props.match.params.id;
    this.state = {
      data: {},
      loading: true,
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    }
    // console.log(mathJax);
  }
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let d = await fetchQuesDet(this.proId);
    this.setState({ data: d, loading: false })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
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
          <Panel name="Hint" desc={this.state.data.hint} />
          <Panel name="Author" desc={this.state.data.author} />
          <Panel name="Source" desc={this.state.data.source} />
          <Panel name="Recommend" desc={this.state.data.recommend} />
          <div className="quesDet-ul">
            <Link key="submit" to={`./submit/${this.proId}`}>提交</Link>
            <Link key="note" to={`./note/${this.proId}`}>解题报告</Link>
            <Link key="return" to={`/main/ques`}>返回</Link>

            {/* <Link key="statistic" to={`./ques/statistic/${this.proId}`}>Statistic</Link> */}
            {/* <Link key="discuss" to={`./ques/discuss/${this.proId}`}>Discuss</Link> */}
          </div>
        </div >
      );
    }
  }
}

export default QuesDet;