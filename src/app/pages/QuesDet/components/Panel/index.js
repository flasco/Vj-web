import React from 'react';
import { Icon, Spin, Modal, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { InlineTex } from 'react-tex';

import './index.css';

class Panel extends React.Component {
  render() {
    if (this.props.desc !== undefined && this.props.desc.length > 0) {
      return (
        <div className="quesDet-Panel-block">
          <div className="quesDet-Panel-title">{this.props.name}</div>
          <div className="quesDet-Panel-content">
            {this.props.desc.indexOf('$') !== -1 ?
              <InlineTex texContent={this.props.desc} texSeperator={'$'}/> :
              <div dangerouslySetInnerHTML={{ __html: this.props.desc }} />}
          </div>
        </div>
      );


    } else {
      return false;
    }
  }
}

export default Panel;