import React from 'react';
import { Form, Button, Row, Col, Upload, Icon, Input, Tooltip, Select } from 'antd';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
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
    let str = "## HEAD 2 \n markdown examples \n ``` welcome ```\n\n<img src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' alt='xxx.png' style='width:72px;'/>";
    this.state = {
      value: str,
      fileList: [...fileList]
    };
    console.log(this.props.data)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== undefined) {
      this.setState({ value: nextProps.data.content });
    }
  }
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let data = {
          ...values,
          content: this.state.value,
          userId: this.props.userId,
        }
        console.log(data);
      }
    });
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
    const { data } = this.props;

    return (
      <Form onSubmit={this.submit}>
        <FormItem
          {...formItemLayout}
          style={{ marginBottom: 12 }}
          label="Title">
          {getFieldDecorator('title', {
            initialValue: data === undefined ? '' : data.title,
          })(
            <Input placeholder="This is Title" />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="To">
          {getFieldDecorator('remoteId', {
            initialValue: data === undefined ? '' : data.remoteId,
          })(
            <Input addonBefore={
              getFieldDecorator('remoteOj', {
                initialValue: data === undefined ? 'HDU' : data.remoteId,
              })(
                <Select style={{ width: 60 }}>
                  <Option value="HDU">HDU</Option>
                  <Option value="PKU">PKU</Option>
                </Select>
                )
            } style={{ width: '45%' }} placeholder=" Id" />
            )}

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
              <Button disabled={fileList.length >= 9} style={{ height: 32, marginLeft: 24 }}>
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
                lineNumbers: true,
                lineWrapping: true,
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
        <FormItem style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" >提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const EditFormWarpper = Form.create()(EditForm);

function select(state) {
  return {
    userId: state.user.id,
  };
}

export default connect(select)(EditFormWarpper);