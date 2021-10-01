import React from 'react';
import {
    Form,
    Input,
    Select,
    Button,
} from 'antd';
import {groupID, userType} from './formVariables.js';

export default function RegistrationForm(props) {
    const { header, error, formItem, button } = props.formInclude;
    const { account, name, email, password, groupIDSelect, phone, userTypeSelect } = formItem;
    const { type, text } = button;
    const { formItemLayout, tailFormItemLayout, onFinish, formID } = props;
    const { Option } = Select;
    const [form] = Form.useForm();

    return (
        <>
                <h3 className="my-3">{header}</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    validateTrigger="onBlur"
                    scrollToFirstError
                    id={formID}
                >
                    {account ? (<Form.Item
                        name="taiKhoan"
                        label="Account"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your account!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>) : ''}
                    {name ? (<Form.Item
                        name="hoTen"
                        label="Full Name"
                        tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>) : ''}

                   {email ? ( <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>) : ''}

                    {password ? (<Form.Item
                        name="matKhau"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>) : ''}

                    {groupIDSelect ? (<Form.Item
                        name="maNhom"
                        label="Group ID"
                        rules={[
                            {
                                required: true,
                                message: 'Please select group ID',
                            },
                        ]}
                    >
                        <Select placeholder="select your group ID">
                            {groupID.map(ID => (
                                <Option value={ID} key={ID}>{ID}</Option>
                            ))}
                        </Select>
                    </Form.Item>) : ''}

                    {userTypeSelect ? (<Form.Item
                        name="maLoaiNguoiDung"
                        label="User Type"
                        rules={[
                            {
                                required: true,
                                message: 'Please select user type',
                            },
                        ]}
                    >
                        <Select placeholder="select your user type">
                            {userType.map(type => (
                                <Option value={type} key={type}>{type}</Option>
                            ))}
                        </Select>
                    </Form.Item>) : ''}

                    {phone ? (<Form.Item
                        name="soDt"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>) : ''}

                    <Form.Item {...tailFormItemLayout}>
                        <Button type={type} htmlType="submit">
                            {text}
                        </Button>
                    </Form.Item>
                </Form>
            </>
    )
}
