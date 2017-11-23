import React from 'react';
// import { Link } from 'react-router-dom';
import { InlineTex } from 'react-tex';

import mj from 'markdown-it-mathjax'
import ReactDOM from 'react-dom';

import './index.css';
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
}).use(require('markdown-it-mathjax')());


class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.md = md;
  }

  renderMathJax = () => {
    const currentNode = ReactDOM.findDOMNode(this);
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, currentNode]);
  }

  componentDidMount() {
    this.renderMathJax();
  }

  componentDidUpdate(props, state) {
    this.renderMathJax();
  }

  render() {
    if (this.props.desc !== undefined && this.props.desc.length > 0) {
      const markdown = this.md.render(this.props.desc);
      return (
        <div className="quesDet-Panel-block">
          <div className="quesDet-Panel-title">{this.props.name}</div>
          <div className="quesDet-Panel-content">
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
          </div>
        </div>
      );
    } else {
      return false;
    }
  }
}

export default Panel;