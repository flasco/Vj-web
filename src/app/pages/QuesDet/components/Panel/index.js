import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class PanelBlock extends React.Component {
  renderMathJax = () => {
    const currentNode = ReactDOM.findDOMNode(this);
    if (window.MathJax !== undefined && window.MathJax.Hub !== undefined && window.MathJax.Hub.Queue !== undefined) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, currentNode]);
    }
  }

  componentDidMount() {
    this.renderMathJax();
  }

  render() {
    return (
      <div>
        <Panel name="Problem Description" desc={this.props.data.description} />
        <Panel name="Input" desc={this.props.data.input} />
        <Panel name="Output" desc={this.props.data.output} />
        <Panel name="Sample Input" desc={this.props.data.sampleInput} />
        <Panel name="Sample Output" desc={this.props.data.sampleOutput} />
        <Panel name="Hint" desc={this.props.data.hint} />
        <Panel name="Author" desc={this.props.data.author} />
        <Panel name="Source" desc={this.props.data.source} />
        <Panel name="Recommend" desc={this.props.data.recommend} />
      </div>
    );
  }
}

class Panel extends React.Component {
  render() {
    if (this.props.desc !== undefined && this.props.desc.length > 0) {
      return (
        <div className="quesDet-Panel-block">
          <div className="quesDet-Panel-title">{this.props.name}</div>
          <div className="quesDet-Panel-content">
            <div dangerouslySetInnerHTML={{ __html: this.props.desc }} />
          </div>
        </div>
      );
    } else {
      return false;
    }
  }
}

export default PanelBlock;