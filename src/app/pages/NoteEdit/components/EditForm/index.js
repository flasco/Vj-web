import React from 'react';
import { Form, Button, Row, Col, Upload, Icon, Input, Tooltip, Select } from 'antd';
import ReactMarkdown from 'react-markdown';

import { UnControlled } from '../Editor';
import config from '../../../../../config';

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
}, {
  uid: -3,
  name: 'yyy.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}, {
  uid: -4,
  name: 'yyy.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}, {
  uid: -5,
  name: 'yyy.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];

const { serverIp } = config;
const FormItem = Form.Item;
const Option = Select.Option;
class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "## HEAD 2 \n markdown examples \n ``` welcome ```\n\n<img src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' alt='xxx.png' style='width:72px;'/>",
      fileList: [...fileList]
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 0
      },
      wrapperCol: {
        span: 24
      },
    };

    return (
      <Form>
        <FormItem
          {...formItemLayout}
          style={{marginBottom:12}}
          label="Title">
          <Input placeholder="This is Title" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="To">
          <Input addonBefore={
            getFieldDecorator('remoteOj', {
              initialValue: 'HDU',
            })(
              <Select style={{ width: 60 }}>
                <Option value="HDU">HDU</Option>
                <Option value="PKU">PKU</Option>
              </Select>
              )
          } style={{ width: '45%' }} placeholder=" Id"/>
          <Upload
            name="pic"
            action={`${serverIp}/files/pic`}
            listType={'picture'}
            defaultFileList={this.state.fileList}
            className={'upload-list-inline'}
            handleChange={({ fileList }) => this.setState({ fileList })}
            withCredentials={true}
            onPreview={(file) => {
              let str = `<img src='${file.url}' alt='${file.name}' style='width:72px;'/>`;
              let x = this.refs.editor;
              x.insertTextAtCursor(str);
              return false
            }}>
            <Tooltip title="max fileList length is 9, if you want add more, use some and delete it, url is still useful">
              <Button disabled={fileList.length >= 9} style={{height:32,marginLeft:24}}>
                <Icon type="upload" /> upload
            </Button>
            </Tooltip>
          </Upload>
        </FormItem>
        <Row style={{ height: 450, marginBottom: 24 }}>
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
              className="noteEdit-markdown markdown-overflowY"
              source={this.state.value}
              escapeHtml={false} />
          </Col>
        </Row>
        <FormItem>
          <Button>提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const EditFormWarpper = Form.create()(EditForm);

export default EditFormWarpper;