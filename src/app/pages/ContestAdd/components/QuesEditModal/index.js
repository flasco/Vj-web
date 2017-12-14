import React from 'react';
import { Modal, Input, Form, Row, Col, Button } from 'antd';

import './index.css';
class QuesEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.data.title,
      description: props.data.description.replace(/<br( ){0,2}\/>/g, '\n'),
      input: props.data.input.replace(/<br( ){0,2}\/>/g, '\n'),
      output: props.data.output.replace(/<br( ){0,2}\/>/g, '\n'),
      sampleInput: props.data.sampleInput,
      sampleOutput: props.data.sampleOutput,
      hint: props.data.hint,
      source: props.data.source,
      author: props.data.author,
      recommend: props.data.recommend,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.description !== undefined) {
      this.setState({
        title: nextProps.data.title,
        description: nextProps.data.description !== undefined ? nextProps.data.description.replace(/<br( ){0,2}\/>/g, '\n') : nextProps.data.description,
        input: nextProps.data.input !== undefined ? nextProps.data.input.replace(/<br( ){0,2}\/>/g, '\n') : nextProps.data.input,
        output: nextProps.data.output !== undefined ? nextProps.data.output.replace(/<br( ){0,2}\/>/g, '\n') : nextProps.data.output,
        sampleInput: nextProps.data.sampleInput !== undefined ? nextProps.data.sampleInput.replace(/<br( ){0,2}\/>/g, '\n') : nextProps.data.sampleInput,
        sampleOutput: nextProps.data.sampleOutput !== undefined ? nextProps.data.sampleOutput.replace(/<br( ){0,2}\/>/g, '\n') : nextProps.data.sampleOutput,
        hint: nextProps.data.hint !== undefined ? nextProps.data.hint.replace(/<br( ){0,2}\/>/g, '\n') : nextProps.data.hint,
        source: nextProps.data.source !== undefined ? nextProps.data.source.replace(/<br( ){0,2}\/>/g, '\n') : nextProps.data.source,
        author: nextProps.data.author !== undefined ? nextProps.data.author.replace(/<br( ){0,2}\/>/g, '\n') : nextProps.data.author,
        recommend: nextProps.data.recommend !== undefined ? nextProps.data.recommend.replace(/<br( ){0,2}\/>/g, '\n') : nextProps.data.recommend,
      })
    }
    this.props = nextProps;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submit({
      title: this.state.title,
      description: this.state.description,
      input: this.state.input,
      output: this.state.output,
      sampleInput: this.state.sampleInput,
      sampleOutput: this.state.sampleOutput,
      hint: this.state.hint,
      source: this.state.source,
      author: this.state.author,
      recommend: this.state.recommend,
    })
  }
  render() {
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
    const { title, description, input, output, sampleInput, sampleOutput, hint, author, source, recommend } = this.state;
    //initialValue: this.data.description.replace(/<br( ){0,2}\/>/g, '\n'),
    return (
      <Form className="quesEdit-form" onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label='title'>
          <Input placeholder='title' onChange={(e) => { this.setState({ title: e.target.value }) }} value={title} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Problem Description'>
          <Input.TextArea
            placeholder="please insert Problem Description "
            onChange={(e) => this.setState({ description: e.target.value })} value={description}>
          </Input.TextArea>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Input'>
          <Input.TextArea
            placeholder="please insert Problem Input "
            onChange={(e) => this.setState({ input: e.target.value })} value={input} >
          </Input.TextArea>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Output'>
          <Input.TextArea
            placeholder="please insert Problem Output "
            onChange={(e) => this.setState({ output: e.target.value })} value={output}>
          </Input.TextArea>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Sample Input'>
          <Input.TextArea
            placeholder="please insert Problem Sample Input "
            onChange={(e) => this.setState({ sampleInput: e.target.value })} value={sampleInput}>
          </Input.TextArea>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Sample Output'>
          <Input.TextArea
            placeholder="please insert Problem Sample Output "
            onChange={(e) => this.setState({ sampleOutput: e.target.value })} value={sampleOutput}>
          </Input.TextArea>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Hint'>
          <Input.TextArea
            placeholder="please insert Problem Hint "
            onChange={(e) => this.setState({ hint: e.target.value })} value={hint}>>
            </Input.TextArea>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Source'>
          <Input placeholder="please insert Problem Source " onChange={(e) => this.setState({ source: e.target.value })} value={source} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Recommend'>
          <Input.TextArea
            placeholder="please insert Problem Recommend "
            onChange={(e) => this.setState({ recommend: e.target.value })} value={recommend}  >
          </Input.TextArea>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='Author'>
          <Input placeholder="please insert Problem Author "  onChange={(e) => this.setState({ author: e.target.value })} value={author} />
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

class QuesEditModal extends React.Component {
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
        {data.key !== -1 && <QuesEditFormWarpper data={data} submit={this.props.submit} />}
      </Modal>
    );
  }

}

export default QuesEditModal;