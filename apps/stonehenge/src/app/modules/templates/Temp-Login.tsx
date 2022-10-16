import { Button, Form, Input } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../login/slice';

export const TempLogin: FC = () => {
  const navigator = useNavigate();
  const loginRequest = async (params: LoginProps) => {
    console.log('params', params);
    const res = await axios
      .post<AxiosResponse>('http://localhost:3333/api/login', {
        ...params,
      })
      .catch((err) => console.log('errors', err));

    const data = res?.data;
    return data;
  };
  const onFinish = (values: LoginProps) => {
    loginRequest(values).then((res) => {
      console.log(res);
      navigator('/welcome');
    });
  };
  return (
    <Form autoComplete="off" onFinish={onFinish} layout="vertical">
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
        Sign in
      </Button>
    </Form>
  );
};
