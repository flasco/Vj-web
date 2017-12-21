import React from 'react';
import { Form, Input, Button, Radio,Upload, message } from 'antd';
import { connect } from 'react-redux';

import { userUpdate } from '../../../../actions';
import config from '../../../../../config';

import './index.css';
const { serverIp } = config;
const FormItem = Form.Item;

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can\'t upload without JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

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

  handleChange = (info) => {
    if (info.file.response !== undefined) {
      let path = `${serverIp}${info.file.response.path}`;
      this.props.dispatch(userUpdate({ icon: path }));
    }
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
    const { data, icon } = this.props;
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
          <Upload
            name="icon"
            showUploadList={false}
            action={`${serverIp}/files/icon`}
            onChange={this.handleChange}
            withCredentials={true}//允许携带cookie
            beforeUpload={beforeUpload}>
            <div className="confForm-img">
              <img src={icon} className="confForm-header" alt={data.accountName} />
              <a className="confForm-header-a" onClick={this.showModal}>Change</a>
            </div>
          </Upload>
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
    icon: state.user.icon
  };
}

export default connect(select)(ConfFormWarpper);