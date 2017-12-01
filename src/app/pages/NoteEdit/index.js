import React from 'react';
import { Button, Row, Col, Upload, Icon } from 'antd';
// import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { UnControlled } from './editor';
// import config from '../../../config';

import './index.css';


// const { serverIp } = config;

const fileList = [{
  uid: -1,
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}, {
  uid: -2,
  name: 'yyy.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];

class NoteEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "## HEAD 2 \n markdown examples \n ``` welcome ```",
    };
  }

  render() {
    return (
      <div className="noteEdit-cont">
        <h1 >这里是解题报告编辑界面</h1>
        <Upload
          action={'//jsonplaceholder.typicode.com/posts/'}
          listType={'picture'}
          defaultFileList={[...fileList]}
          className={'upload-list-inline'}
          withCredentials={true}
          onPreview={(file) => {
            let str = `<img src='${file.url}' alt='${file.name}' />`;
            let x = this.refs.editor;
            x.insertTextAtCursor(str);
            return false
          }}>
          <Button>
            <Icon type="upload" /> upload
      </Button>
        </Upload>
        <Row style={{ height: 450 }}>
          <Col span={12}>
            <UnControlled
              ref='editor'
              value={this.state.value}
              options={{
                mode: 'xml',
                theme: 'duotone-light',
                lineNumbers: true
              }}
              autoCursor={false}
              autoScroll={true}
              onChange={(editor, data, value) => {
                this.setState({ value })
              }}
            />
          </Col>
          <Col span={12}>
            <ReactMarkdown
              className="noteEdit-markdown"
              source={this.state.value}
              escapeHtml={false} />
          </Col>
        </Row>

        <br />
        <div style={{ textAlign: 'center' }}><Button>提交</Button></div>
      </div>
    );
  }

}

export default NoteEdit;