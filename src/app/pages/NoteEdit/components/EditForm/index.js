import React from 'react';
import { Form, Button, Row, Col, Upload, Icon, Input, Tooltip, Select, message } from 'antd';
import ReactMarkdown from 'react-markdown';

import { createNote, updateNote } from '../../../../services/note';
import { UnControlled } from '../Editor';
import config from '../../../../../config';

const fileList = [{
  uid: -1,
  response: {
    newName: 'uuu.png',
    path: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }
}, {
  uid: -2,
  response: {
    newName: 'uuu.png',
    path: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }
}];

const { serverIp } = config;
const FormItem = Form.Item;
const Option = Select.Option;
class EditForm extends React.Component {
  constructor(props) {
    super(props);
    let str = "## HEAD 2 \n markdown examples \n\n ``` welcome ```\n\n<img src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' alt='xxx.png' style='width:72px;'/>";
    this.state = {
      value: props.data.content !== undefined ? props.data.content : str,
      fileList: [...fileList]
    };
  }
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let note = {};
        let data = '';
        if (this.props.data !== '') {
          note = {
            ...values,
            content: this.state.value,
            userId: this.props.userId,
            id: this.props.nid,
          }
          data = await updateNote(note);
        } else {
          note = {
            ...values,
            content: this.state.value,
            userId: this.props.userId,
          }
          data = await createNote(note);
        }
        if (data.success === 0) {
          message.error('Operation is failed, server is boom.');
        } else {
          message.success('Operation success.');
          let path = this.props.data !== '' ? `/main/ques/${note.remoteOj}/${note.remoteProblemId}/note/${this.props.nid}` : `/main/ques/${note.remoteOj}/${note.remoteProblemId}/note`;
          this.props.history.push(path);
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
    // console.log(data)
    return (
      <Form onSubmit={this.submit}>
        <FormItem
          {...formItemLayout}
          style={{ marginBottom: 12 }}
          label="Title">
          {getFieldDecorator('title', {
            initialValue: data.length < 1 ? '' : data.title,
          })(
            <Input placeholder="This is Title" />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="To">
          {getFieldDecorator('remoteProblemId', {
            initialValue: data.length < 1 ? '' : data.remoteProblemId,
          })(
            <Input addonBefore={
              getFieldDecorator('remoteOj', {
                initialValue: data.length < 1 ? 'HDU' : data.remoteOj,
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
              let str = `<img src='${serverIp}${file.response.path}' alt='${file.response.newName}' style='width:72px;'/>`;
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
              className="noteEdit-markdown noteEdit-markdown-edit markdown-overflowY"
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



export default EditFormWarpper;