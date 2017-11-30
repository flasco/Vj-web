
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { cipher, decipher } from '../../../../../../utils/crypto';

import { getItem, setItem, removeItem } from '../../../../../../utils/localStorage';

import './index.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
    }
    this.user = {
      accountName: '',
      password: ''
    };
    this.decUser();
  }

  decUser = async () => {
    this.remember = await getItem('@virtualJudge_remember');
    if(this.remember !== void 0){
      this.user = {
        accountName: await decipher('aes-256-cbc', '1314520', this.remember.accountName),
        password: await decipher('aes-256-cbc', '1314520', this.remember.password)
      };
      this.forceUpdate();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isError) {
      this.setState({ buttonLoading: false });
      this.remember = null;
      this.props.setError(false);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ buttonLoading: true })
        if (values.remember) {
          if (this.remember === undefined) {
            let n = {
              accountName: await cipher('aes-256-cbc', '1314520', values.accountName),
              password: await cipher('aes-256-cbc', '1314520', values.password),
            }
            setItem('@virtualJudge_remember', n);
          }
        } else {
          this.remember !== null && removeItem('@virtualJudge_remember');
        }
        this.props.submit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('accountName', {
            validateTrigger: "onBlur",
            initialValue: this.user.accountName,
            rules: [{ required: true, message: 'make sure that your accountName is Prescribed.', max: 10, min: 3 }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="accountName" />
            )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            validateTrigger: "onBlur",
            initialValue: this.user.password,
            rules: [{ required: true, message: 'make sure that your password is Prescribed.', max: 12, min: 6 }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
        </Form.Item>
        <Form.Item style={{ marginBottom: 6 }}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: this.user.password.length > 0,
          })(
            <Checkbox>Remember me</Checkbox>
            )}
          <a className="login-form-forgot" href="">Forgot password</a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.buttonLoading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const LoginFormWapper = Form.create()(LoginForm);

export default LoginFormWapper;