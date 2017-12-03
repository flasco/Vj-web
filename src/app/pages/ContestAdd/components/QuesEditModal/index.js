import React from 'react';
import { Modal, Input, Form, Row, Col, Button } from 'antd';

import './index.css';
class QuesEditForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 18
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 18,
        offset: 5,
      },
    }
    return (
      <Form className="quesEdit-form" onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label='title'>
          {getFieldDecorator('title', {
            initialValue: this.data.title,
          })(
            <Input placeholder='title' />
            )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Problem Description'>
          {getFieldDecorator('description', {
            initialValue: this.data.description.replace(/<br( ){0,2}\/>/g, '\n'),
          })(
            <Input.TextArea
              placeholder="please insert Problem Description ">
            </Input.TextArea>
            )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Input'>
          {getFieldDecorator('input', {
            initialValue: this.data.input.replace(/<br( ){0,2}\/>/g, '\n'),
          })(
            <Input.TextArea
              placeholder="please insert Problem Input " >
            </Input.TextArea>
            )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Output'>
          {getFieldDecorator('output', {
            initialValue: this.data.output.replace(/<br( ){0,2}\/>/g, '\n'),
          })(
            <Input.TextArea
              placeholder="please insert Problem Output " >
            </Input.TextArea>
            )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Sample Input'>
          {getFieldDecorator('sampleInput', {
            initialValue: this.data.sampleInput.replace(/<br( ){0,2}\/>/g, '\n'),
          })(
            <Input.TextArea
              placeholder="please insert Problem Sample Input " >
            </Input.TextArea>
            )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Sample Output'>
          {getFieldDecorator('sampleOutput', {
            initialValue: this.data.sampleOutput.replace(/<br( ){0,2}\/>/g, '\n'),
          })(
            <Input.TextArea
              placeholder="please insert Problem Sample Output " >
            </Input.TextArea>
            )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Hint'>
          {getFieldDecorator('hint', {
            initialValue: this.data.hint.replace(/<br( ){0,2}\/>/g, '\n'),
          })(
            <Input.TextArea
              placeholder="please insert Problem Hint " >
            </Input.TextArea>
            )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Source'>
          {getFieldDecorator('source', {
            initialValue: this.data.source,
          })(
            <Input placeholder="please insert Problem Source " />
            )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Recommend'>
          {getFieldDecorator('recommend', {
            initialValue: this.data.recommend === undefined ? '' : this.data.recommend.replace(/<br( ){0,2}\/>/g, '\n'),
          })(
            <Input.TextArea
              placeholder="please insert Problem Recommend " >
            </Input.TextArea>
            )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Author'>
          {getFieldDecorator('author', {
            initialValue: this.data.author,
          })(
            <Input placeholder="please insert Problem Author " />
            )}
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Confirm</Button>
        </Form.Item>
      </Form>
    );
  }
}

const QuesEditFormWarpper = Form.create()(QuesEditForm);

class QuesEditModal extends React.PureComponent {
  render() {
    let { data } = this.props.data !== undefined ? this.props : { data: { key: -1 } };
    return (
      <Modal
        width={650}
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        maskClosable={false}
        footer={null}>
        <Row style={{ marginBottom: 8 }}>
          <Col span={12} style={{ fontSize: 16 }}>Ques Edit</Col>
        </Row>
        {data.key !== -1 && <QuesEditFormWarpper data={data} submit={this.props.submit}/>}
      </Modal>
    );
  }

}

export default QuesEditModal;