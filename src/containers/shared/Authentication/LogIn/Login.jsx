import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, Link } from 'react-router-dom';
import { actLogin } from '../module/action';
import Loader from 'components/Loader/Loader';

export default function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, error, currentUser} = useSelector(state => state.authReducer);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(actLogin(values, history));
    };

    if (loading) return <Loader />;

    return !currentUser ? (
        <>
            <h3>Log In</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    style={{width: '500px' }}
                    validateTrigger="onBlur"
                >
                    <Form.Item
                        name="taiKhoan"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="matKhau"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        {' '}Or <Link to="/signup">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </>
    ) : (
        <Redirect to="/" />
    );
}
