import React from 'react';
import { Icon, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import loadScript from 'load-script'

import { fetchQuesDet } from '../../services/problem'
import { fetchContestQues } from '../../services/contest'

import PanelBlock from './components/Panel';
import NoPermisson from '../../components/NoPermisson';

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

let cid = '', oj = '', qid = '', pwd = '', typx = false;

class QuesDet extends React.Component {
  constructor(props) {
    super(props);
    loadScript(MATHJAX_SCRIPT, () => {
      window.MathJax.Hub.Config(MATHJAX_OPTIONS);
    });
    this.id = props.match.params.qid;
    typx = false;

    if (props.location.state !== void 0) {
      typx = true;
      cid = props.match.params.cid;
      pwd = props.location.state.pwd;
      qid = props.location.state.qid;
      oj = props.location.state.oj;
    } else {
      cid = '';
      qid = props.match.params.qid;
      oj = props.match.params.oj;
    }
    console.log(props.location.state)


    this.state = {
      data: {},
      loading: true,
      isFailed: false,
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  componentWillReceiveProps(nextProps) {
    if (this.id !== nextProps.match.params.qid) {
      this.setState({ loading: true });
      // console.log(nextProps)
      this.fetchData(nextProps.location.state.qid);
    }
    return true
  }

  async fetchData(quesId = qid) {
    if (typx) {
      let d = await fetchContestQues(oj, quesId, cid, pwd);
      if (d.success === 0) {
        message.error('password error');
        this.setState({ isFailed: true })
      }
      this.setState({ data: d.obj, loading: false })
    } else {
      let d = await fetchQuesDet(oj, quesId, cid);
      this.setState({ data: d, loading: false })
    }
  }

  render() {
    if (this.state.isFailed) {
      return <NoPermisson path='/main/contest' history={this.props.history} />
    }
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
            {
              typx ? (
                <a onClick={() => {
                  this.props.changePage('3');
                }}>Submit</a>
              ) : (
                  <div>
                    <Link key="submit" to={{ pathname: `./${this.id}/submit`, state: { oj, qid, cid } }}>Submit</Link>
                    <Link key="note" to={`./${this.id}/note`}>Note</Link>
                    <Link key="return" to={typx ? `../${cid}` : '../'}>Back</Link>
                  </div>
                )
            }
          </div>
          {/* <Link key="statistic" to={`./ques/statistic/${this.proId}`}>Statistic</Link> */}
          {/* <Link key="discuss" to={`./ques/discuss/${this.proId}`}>Discuss</Link> */}

        </div >
      );
    }
  }
}

export default QuesDet;