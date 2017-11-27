import React from 'react';
import { Form, Input, Button, Radio } from 'antd';

import Uploader from '../Uploader';

import './index.css';
const FormItem = Form.Item;

class ConfForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UpVisible: false,
    }
  }

  handleCancel = () => {
    this.setState({ UpVisible: false });
  }
  showModal = () => {
    this.setState({
      UpVisible: true,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.props.submit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} className="confForm-form" >
        <FormItem
          {...formItemLayout}
          label="NickName">
          {getFieldDecorator('nickName', {
            initialValue: '无夏丶',
            rules: [{
              required: true, message: 'Please input your nickName',
            }],
          })(
            <Input style={{ width: '50%' }} />
            )}
          <div className="confForm-img">
            <img src="http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg" className="confForm-header" alt="无夏丶" />
            <a className="confForm-header-a" onClick={this.showModal}>Change</a>
            <Uploader visible={this.state.UpVisible} handleCancel={this.handleCancel}/>
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="AccountName">
          <span>cool</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Signature">
          {getFieldDecorator('desc', {
            initialValue: '',
          })(
            <Input.TextArea placeholder="write sth. about yourself" style={{ height: 88, resize: 'none' }} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Gender">
          {getFieldDecorator('sex', {
            initialValue: 'man',
          })(
            <Radio.Group >
              <Radio.Button value="man">man</Radio.Button>
              <Radio.Button value="woman">woman</Radio.Button>
              <Radio.Button value="secret">secret</Radio.Button>
            </Radio.Group>
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="School">
          {getFieldDecorator('school', {
            initialValue: '',
          })(
            <Input style={{ width: '50%' }} placeholder="school name." />
            )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 14, offset: 6, }}>
          <Button type="primary" htmlType="submit">Save</Button>
        </FormItem>
      </Form>
    );
  }
}

const ConfFormWarpper = Form.create()(ConfForm);

export default ConfFormWarpper;