import React, { useState, useContext } from 'react';
import { Button, Checkbox, Form, Input, Row, Col, message } from 'antd';
import axios, { isCancel, AxiosError } from "axios";
import { loginAPI } from '../../enviroment';
import styles from '../../css/login.module.css'
import { useNavigate, Link } from 'react-router-dom';
import SetManagerContext from '../../context/ManagerContext';

const Login = () => {

  const [formItems, setFormItems] = useState({ username: '', password: '' });

  const { setCurrent, setDisplayUsername, setInforUsername, setDisplayLogin } = useContext(SetManagerContext);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('username', formItems.username);
    formData.append('password', formItems.password);


    axios.post(loginAPI, formData)
      .then(response => {
        console.log(response);
        const token = response.headers['authorization'];
        sessionStorage.setItem("token", token);

        //set token to axios common header
        setAuthToken(token);
        messageApi
          .open({
            type: 'loading',
            content: 'Đang đăng nhập',
            duration: 1,
            className: styles.login__message,
          })
          .then(() =>
            messageApi.open({
              type: 'success',
              content: 'Đăng nhập thành công',
              duration: 1.5,
              className: styles.login__message
            }))

        setTimeout(() => {
          setDisplayLogin('none');
          setCurrent('departments');
          navigate('/departments');
        }, 1800);
      })
      .catch((err) => {
        console.log(err);
        messageApi
          .open({
            type: 'loading',
            content: 'Đang đăng nhập',
            duration: 1,
            className: styles.login__message,

          })
          .then(() =>
            messageApi.open({
              type: 'error',
              content: 'Username hoặc mật khẩu không đúng, mời kiểm tra lại',
              duration: 1.6,
              className: styles.login__message
            }))
      }
      )
  };

  const handleChangeInput = (event) => {
    const formName = event.target.name;
    const value = event.target.value;
    setFormItems({
      ...formItems,
      [formName]: value,
    });
    setInforUsername(formItems.username);
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: '82vh' }}>
      {contextHolder}
      <Col span={10}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          onFinishFailed={() => { }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                min: 6,
                message: 'Username must have at least 6 characters!',
              },
            ]}
          >
            <Input
              name='username'
              onChange={handleChangeInput}
              value={formItems.username}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Password must not blank',
              },
            ]}
          >
            <Input.Password
              name='password'
              onChange={handleChangeInput}
              value={formItems.password} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
            <Link to='/login/forgor-password'>Forgot password?</Link>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
};

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  }
  else
    delete axios.defaults.headers.common["Authorization"];
}

export default Login;