import React from 'react';
import { Link } from 'react-router-dom';
class NoPermission extends React.PureComponent {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push(this.props.path || '/');
    }, 1000);
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>
          You have no permission to visit this page
        </h1>
        <Link key='back' to={this.props.path || '/'} style={{ fontSize: 16, lineHeight: '52px' }}>back</Link>
      </div>
    );
  }
}

export default NoPermission;