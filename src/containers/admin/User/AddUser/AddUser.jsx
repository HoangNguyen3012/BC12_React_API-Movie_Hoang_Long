import userApi from 'apis/userApi';
import React from 'react';
import { useSelector } from 'react-redux';
import RegistrationForm from 'components/Forms/Registration';
import { Modal } from 'antd';

export default function AddUser() {

    const currentUser = useSelector(state => state.authReducer.currentUser);

    ////// Form props //////
    const formID = 'AddUser';
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 7,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 12,
            },
        },
    }; // width and responsive
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 24,
                offset: 0,
            },
        },
    }; // width and responsive
    const formInclude = {
        header: 'Fill in form to add user',
        error: null,
        formItem: {
            account: true,
            name: true,
            email: true,
            password: true,
            groupIDSelect: true,
            phone: true,
            userTypeSelect: true,
        },
        button: {
            type: 'primary',
            text: 'Add user',
        },
    };


    const onFinish = (user) => {
        // console.log('Received values of form: ', user);

        userApi
            .addUserApi(user, currentUser.accessToken)
            .then(response => {
                console.log('New user', response.data);
                Modal.success({
                    title: 'New user added successfully!',
                    content: `Welcome user ${response.data.taiKhoan} to Movie Project!`,
                });
                document.getElementById(formID).reset();
            })
            .catch(error => {
                console.log(error);
                Modal.error({
                    title: 'Can not add user',
                    content: `Error code ${error}`,
                })
            })
    }
    ////// Form props end //////
    return <RegistrationForm formInclude={formInclude} formItemLayout={formItemLayout} tailFormItemLayout={tailFormItemLayout} onFinish={onFinish} formID={formID} />;
}
