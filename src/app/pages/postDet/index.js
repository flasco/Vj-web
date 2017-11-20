import React from 'react';
import { Button } from 'antd';

import { aaa } from '../../services/index'

import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    let postId = props.match.params.postId;

    this.state = {
      // rawContent: '',
      markdownContent: "1234",
    }

    this.abc = this.abc.bind(this);
  }

  async abc(){
    console.log('action');

    const data = await aaa();
    console.log(data);
    this.setState({
      markdownContent:'xxx真好'
    })
  }


  render() {
    return (
      <div className="main-container">
        <span>{this.props.match.params.postId}</span>
        <div>{this.state.markdownContent}</div>
        <Button 
        type="primary" 
        onClick={this.abc}>点击fetch</Button>
      </div>
    );
  }
}

export default App;