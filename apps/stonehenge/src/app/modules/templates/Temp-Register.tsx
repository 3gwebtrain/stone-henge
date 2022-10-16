import { Button, Form, Input } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { FC } from 'react';
import { LoginProps } from '../login/slice';

export const TempRegister: FC = () => {
  const sendRequest = async (params: LoginProps) => {
    console.log('params', params);
    const res = await axios
      .post<AxiosResponse>('http://localhost:3333/api/signup', {
        ...params,
      })
      .catch((err) => console.log('errors', err));

    const data = res?.data;
    return data;
  };
  const onFinish = (values: LoginProps) => {
    console.log(values);
    sendRequest(values).then((data) => console.log('response', data));
  };
  return (
    <Form autoComplete="off" onFinish={onFinish} layout="vertical">
      <Form.Item
        label=" Name"
        name="name"
        rules={[{ required: true, message: ' name  required' }]}
      >
        <Input placeholder=" name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email  required' }]}
      >
        <Input placeholder="Email address" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password' }]}
      >
        <Input.Password placeholder="password" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Register
      </Button>
    </Form>
  );
};
