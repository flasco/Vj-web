
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isError) {
      this.setState({ buttonLoading: false })
      this.props.setError(false);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ buttonLoading: true })
        this.props.submit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            validateTrigger: "onBlur",
            rules: [{ required: true, message: 'make sure that 3 ≤ userName.len ≤ 10.', max: 10, min: 3 }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            validateTrigger: "onBlur",
            rules: [{ required: true, message: 'make sure that 6 ≤ passWord.len ≤ 12.', max: 12, min: 6 }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            validateTrigger: "onBlur",
            rules: [{ required: true, pattern: /.*@.*\..*/, message: 'make sure that your Email.Addr is Prescribed.' }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
            )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [{
              required: true,
              message: 'make sure that you read the agreement :)'
            }]
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
            )}
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.buttonLoading}>Register</Button>
        </Form.Item>
      </Form>
    );
  }
}

const RegisterFormWapper = Form.create()(RegisterForm);

export default RegisterFormWapper;