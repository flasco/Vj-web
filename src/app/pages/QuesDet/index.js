import React from 'react';
import { Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';
import loadScript from 'load-script'

import { fetchQuesDet } from '../../services/problem'
import { fetchContestQues } from '../../services/contest'

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
    console.log(props.location.state);
    if (props.match.params.id === void 0) {
      // console.log('比赛页面Jmp');
      this.typx = true;
      this.cid = props.match.params.cid;
      this.oj = props.location.state.oj;
      this.qid = props.location.state.qid;
    } else {
      // console.log('题库页面Jmp');
      this.typx = false;
      this.qid = props.match.params.id;
      this.oj = props.match.params.oj;
    }

    this.state = {
      data: {},
      loading: true,
    }
  }
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    if (this.typx) {
      let d = await fetchContestQues(this.oj, this.qid, this.cid);
      this.setState({ data: d, loading: false })
    } else {
      let d = await fetchQuesDet(this.oj, this.qid, this.cid);
      this.setState({ data: d, loading: false })
    }
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
            <Link key="submit" to={`./${this.qid}/submit`}>Submit</Link>
            {this.typx || <Link key="note" to={`./${this.qid}/note`}>Note</Link>}
            <Link key="return" to={this.typx ? `../${this.cid}` : '../'}>Back</Link>
            {/* <Link key="statistic" to={`./ques/statistic/${this.proId}`}>Statistic</Link> */}
            {/* <Link key="discuss" to={`./ques/discuss/${this.proId}`}>Discuss</Link> */}
          </div>
        </div >
      );
    }
  }
}

export default QuesDet;