import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { connect } from 'react-redux';
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
        this.props.submit(values);
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
    const { data,icon } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="confForm-form" >
        <FormItem
          {...formItemLayout}
          label="Id">
          <span>{data.id}</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="AccountName">
          <span>{data.accountName}</span>
          <div className="confForm-img">
            <img src={icon} className="confForm-header" alt={data.accountName} />
            <a className="confForm-header-a" onClick={this.showModal}>Change</a>
            <Uploader visible={this.state.UpVisible} handleCancel={this.handleCancel} />
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Gender">
          {getFieldDecorator('gender', {
            initialValue: `${data.gender}`,
          })(
            <Radio.Group >
              <Radio.Button value="1">male</Radio.Button>
              <Radio.Button value="2">female</Radio.Button>
              <Radio.Button value="3">secret</Radio.Button>
            </Radio.Group>
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="School">
          {getFieldDecorator('school', {
            initialValue: data.school,
            rules: [{ max: 40 }]
          })(
            <Input style={{ width: '50%' }} placeholder="school name." />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Signature">
          {getFieldDecorator('description', {
            initialValue: data.description,
            rules: [{ max: 120 }]
          })(
            <Input.TextArea placeholder="write sth. about yourself" style={{ height: 88, resize: 'none' }} />
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

function select(state) {
  return {
    icon:state.user.icon
  };
}

export default connect(select)(ConfFormWarpper);