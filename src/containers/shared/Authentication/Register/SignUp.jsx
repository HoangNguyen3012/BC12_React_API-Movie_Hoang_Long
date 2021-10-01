import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Loader/Loader';
import { actSignup } from '../module/action';
import RegistrationForm from 'components/Forms/Registration';

export default function SignUp() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, error, currentUser} = useSelector(state => state.authReducer);

    ////// Form props //////
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
                span: 11,
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
        header: 'Fill in to sign up',
        error: error,
        formItem: {
            account: true,
            name: true,
            email: true,
            password: true,
            groupIDSelect: true,
            phone: true,
            userTypeSelect: false,
        },
        button: {
            type: 'primary',
            text: 'Register',
        },
    };


    const onFinish = (values) => {
        values = { ...values, maLoaiNguoiDung: 'KhachHang' };
        console.log('Received values of form: ', values);
        dispatch(actSignup(values, history));
    }
    ////// Form props end //////

    if (loading) return <Loader />;
    if (currentUser) return <Redirect to="/" />;
    return <RegistrationForm formInclude={formInclude} formItemLayout={formItemLayout} tailFormItemLayout={tailFormItemLayout} onFinish={onFinish} />;
}