import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Form, Input, Row, message } from 'antd';
import { useContext, useState } from 'react';
import { AccountDTO, getAccount } from '../../stores/AccountStore';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../components/context/AccountContext';
import { cssResponsive } from '../../components/Manager/AppConst';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Register from '../Register';

function Login() {
    const [isSignIn, setIsSignIn] = useState(true);
    const accountContext = useContext(AccountContext)
    const navigate = useNavigate()
    const onFinish: FormProps<AccountDTO>['onFinish'] = async (values) => {
        const account = await getAccount(values.ac_username, values.ac_password);

        if (!!account) {
            await accountContext.setAccount(account)
            navigate("/dashbroad")
        } else {
            message.error('Sai tài khoản hoặc mật khẩu !');
        }
    };

    return (
        <div>
            <Row>
                <Col {...cssResponsive(24, 24, 24, 9, 9, 9)} className='register-form'>
                    {isSignIn
                        ?
                        <div className="login-form">
                            <h2 className='form-title'>Đăng nhập</h2>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <label className='register-label'>Tên tài khoản</label>
                                <Form.Item
                                    name="ac_username"
                                    rules={[{ required: true, message: 'Vui lòng nhập Tên tài khoản!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <label className='register-label'>Mật khẩu</label>
                                <Form.Item
                                    name="ac_password"
                                    rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        placeholder="Mật khẩu"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Nhớ mật khẩu</Checkbox>
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Đăng nhập
                                    </Button>
                                    <div>Không có tài khoản?
                                        <label className='register-now' onClick={async () => await setIsSignIn(false)}>Đăng ký ngay!</label></div>
                                </Form.Item>
                            </Form>
                        </div>
                        :
                        <Register setIsSignIn= {setIsSignIn}/>
                    }
                </Col>
                <Col {...cssResponsive(24, 24, 24, 15, 15, 15)} className='register-banner'>
                    <img src="/image/bg_login.jpg" alt="" />
                </Col>
            </Row>
        </div>
    )
}

export default Login;