import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { createAccount } from '../../stores/AccountStore';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

interface IProps {
    setIsSignIn?: (isSignIn: boolean) => void,
}

function Register({ setIsSignIn }: IProps) {
    const onFinish: FormProps['onFinish'] = async (values) => {
        const { confirm, ...newAccount } = values;
        await createAccount(newAccount,
            (isSuccess) => {
                if (isSuccess) {
                    message.success('Tạo tài khoản mới thành công!');
                    setIsSignIn!(true);
                }
            }
        )
    };

    return (
        <div>
            <h2 className='form-title'>Đăng ký</h2>
            <Form
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <label className='register-label'>Tên</label>
                <Form.Item
                    name="me_name"
                    rules={[{ required: true, message: 'Vui lòng nhập Tên của bạn!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên" />
                </Form.Item>

                <label className='register-label'>Tên tài khoản</label>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập Tên tài khoản!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên tài khoản" />
                </Form.Item>

                <label className='register-label'>email</label>
                <Form.Item
                    name="me_email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email không hợp lệ!',
                        },
                        {
                            required: true,
                            message: 'Vui lòng nhập Email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>


                <label className='register-label'>Mật khẩu</label>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>

                <label className='register-label'>Xác nhận mật khẩu</label>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng xác nhận Mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu mới không trùng khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default Register;