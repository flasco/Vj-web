import React from 'react';
import { Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';
import loadScript from 'load-script'

import { fetchQuesDet } from '../../services/problem'

import PanelBlock from './components/Panel';

import './index.css';

const MATHJAX_SCRIPT = "https://cdn.bootcss.com/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML";
const MATHJAX_OPTIONS = {
  tex2jax: {
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']]
  },
  showMathMenu: false,
  showMathMenuMSIE: false
};


class QuesDet extends React.Component {
  constructor(props) {
    super(props);
    loadScript(MATHJAX_SCRIPT, () => {
      window.MathJax.Hub.Config(MATHJAX_OPTIONS);
    });

    if (props.match.params.id === undefined) {
      console.log('比赛页面Jmp');
      this.cid = props.match.params.cid;
      this.qid = props.match.params.qid;
    } else {
      console.log('题库页面Jmp');
      this.qid = props.match.params.id;
    }

    this.state = {
      data: {},
      loading: true,
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    }
  }
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let d = await fetchQuesDet(this.qid);
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

          <PanelBlock data={this.state.data} />
          <div className="quesDet-ul">
            <Link key="submit" to={`./${this.qid}/submit`}>提交</Link>
            <Link key="note" to={`./${this.qid}/note`}>解题报告</Link>
            <Link key="return" to={`./`}>返回</Link>

            {/* <Link key="statistic" to={`./ques/statistic/${this.proId}`}>Statistic</Link> */}
            {/* <Link key="discuss" to={`./ques/discuss/${this.proId}`}>Discuss</Link> */}
          </div>
        </div >
      );
    }
  }
}

export default QuesDet;