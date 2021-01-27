import React, { Component } from 'react';
import axios from 'axios';

import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class SignIn extends Component {

  onFinishSignUp = async (values) => {
    const { data } = await axios.get('http://localhost:3000/signup', values )
    const { token } = data
    localStorage.setItem("token", token)
    this.props.history.push("/home")
  };

  onFinishLogIn = async (values) => {
    const { data } = await axios.get('http://localhost:3000/login', values )
    const { token } = data
    localStorage.setItem("token", token)
    this.props.history.push("/home")
  };

  render() {
    return (
      <div>
        <>
        <h1>SignUp</h1>
        <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={this.onFinishSignUp}>

          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your username!' }]} >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true, message: 'Please input a valid email!' }]} >
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </>

        <>
        <h1>Login</h1>
        <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={this.onFinishLogIn}>

          <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true, message: 'Please input a valid email!' }]} >
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </>
      </div>
    );
  }
}

export default SignIn;