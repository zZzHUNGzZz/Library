import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import MainLayout from '../../components/Layout';
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

interface IProps {
    isLoginSuccess?: (isLoginSuccess: boolean) => void;
}

const Login: React.FC<IProps> = (props) => {
    const [isVisibleLogin, setIsVisibleLogin] = useState(true);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        if (values.username === 'admin' && values.password === '123456') {
            if (!!props.isLoginSuccess) {
                props.isLoginSuccess(true);
                setIsVisibleLogin(false)
            }
        } else {
            message.error('Sai tài khoản hoặc mật khẩu !');
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        message.error('Đăng nhập thất bại!')
    };
    return (
        <>
          {isVisibleLogin && <div id='login' style={{ maxWidth: 600, margin: '100px auto'}}>
                <h2 className='align-center' style={{ marginBottom: '50px' }}>Login</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}

                    style={{}}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên tài khoản"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>}
        </>
    )
}

export default Login;