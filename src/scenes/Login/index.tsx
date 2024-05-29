import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useContext } from 'react';
import { AccountDTO, getAccount } from '../../stores/AccountStore';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../components/context/AccountContext';

function Login() {
    const accountContext = useContext(AccountContext)
    const navigate = useNavigate()
    const onFinish: FormProps<AccountDTO>['onFinish'] = async (values) => {
        const account = await getAccount(values.ac_user_name, values.ac_password);
        if (!!account) {
            await accountContext.setAccount(account)
            navigate("/dashbroad")
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
                    <Form.Item<AccountDTO>
                        label="Tên tài khoản"
                        name="ac_user_name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<AccountDTO>
                        label="Mật khẩu"
                        name="ac_password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item<AccountDTO>
                        // name="remember"
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
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" >
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Login;