import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useContext, useState } from 'react';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

function Login() {
    const [role, setRole] = useState();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        
        if (values.username === 'a' && values.password === '1') {
            message.success('login success !');

        } else {
            message.error('Sai tài khoản hoặc mật khẩu !');
        }
    };

    return (
        <>
           <div id='login' style={{ maxWidth: 600, margin: '100px auto' }}>
                <h2 className='align-center' style={{ marginBottom: '50px' }}>Login</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    style={{}}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
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
            </div>
        </>
    )
}

export default Login;