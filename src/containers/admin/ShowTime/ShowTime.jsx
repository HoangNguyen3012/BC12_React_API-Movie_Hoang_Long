import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Col,
    Row,
    Form,
    Modal,
    Button,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
} from 'antd';
import Loader from 'components/Loader/Loader';
import { useHistory } from 'react-router';
import cinemaApi from 'apis/cinemaApi';
import showTimeApi from 'apis/showTimeApi';
import moment from 'moment';

export default function ShowTime(props) {
    const [state, setState] = useState({
        listCinemaSystem: [],
        listCinema: [],
        loading: true,
    });

    const history = useHistory();

    const movieDetailLocal = JSON.parse(localStorage.getItem('movieDetail'));
    console.log(movieDetailLocal);
    const { maPhim, tenPhim, hinhAnh } = movieDetailLocal;
    
    useEffect( async () => {
        try {
            let result = await cinemaApi.fetchAllCinemaSystem();

            setState({
                ...state,
                listCinemaSystem: result.data,
                loading: false,
            });
        }
        catch(error) {
            console.log(error);
        }

    }, []);

    const { accessToken } = useSelector(state => state.authReducer.currentUser);

    const [form] = Form.useForm();

    const onFinish = async value => {
        try {
            let result = await showTimeApi.addShowTime(form.getFieldsValue(true), accessToken);
            console.log(result.data);
            Modal.success({
                title: result.data,
            });
            localStorage.removeItem('movieDetail');
            history.push('/admin/movie');
        }
        catch(error) {
            console.log(error);
        }
    }

    const onChangeSelectCinemaSystem = async value => {
        try {
            let result = await cinemaApi.fetchAllCinema(value);
            setState({
                ...state,
                listCinema: result.data,
                loading: false,
            })
        }
        catch(error) {
            console.log(error);
        }
    }

    const onChangeSelectCinema = value => {
        form.setFieldsValue({
            ...form.getFieldsValue(true),
            maRap: value[1],
        })
    };

    const onOk = value => {
        form.setFieldsValue({
            ...form.getFieldsValue(true),
            ngayChieuGioChieu: moment(value).format("DD/MM/YYYY hh:mm:ss"),
        })
    };

    return state.loading ? (<Loader/>) : (
        <>
        <h3>Movie {tenPhim}</h3>
        <h4>Add a Show Time</h4>
        <Form
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 17,
            }}
            layout="horizontal"
            onFinish={onFinish}
            form={form}
            initialValues={{
                maPhim: maPhim,
                ngayChieuGioChieu: null,
                maRap: null,
                giaVe: 75000,
            }}
            style={{ textAlign: 'left' }}
        >
                    <Row>
            <Col xl={20} md={18} xs={24}>
            <Form.Item label="Cinema System">
                <Select options={
                        state.listCinemaSystem?.map((cinemaSystem, idx) => (
                            {label: cinemaSystem.tenHeThongRap, value: cinemaSystem.maHeThongRap
                        }))
                        }
                        onChange={onChangeSelectCinemaSystem}
                        placeholder="Choose your cinema system"
                        >
                </Select>
            </Form.Item>
            <Form.Item label="Cinema">
                <Cascader
                    options={
                        state.listCinema?.map((cinema, idx) => (
                            {
                                label: cinema.tenCumRap,
                                value: cinema.maCumRap,
                                children: cinema.danhSachRap.map((cinemaRoom, idx) => (
                                    {
                                        label: cinemaRoom.tenRap,
                                        value: cinemaRoom.maRap,
                                    }
                                )
                                )
                        }))
                    }
                    onChange={onChangeSelectCinema}
                    placeholder="Choose where you want to see"
                />
            </Form.Item>

            <Form.Item label="Show Time">
                <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onOk={onOk}/>
            </Form.Item>

            <Form.Item label="Ticket Price (VND)" name="giaVe">
                <InputNumber min={75000} max={150000}/>
            </Form.Item>
            </Col>
            <Col lg={4} md={4} xs={0}>
                <img src={hinhAnh} alt="logo" width={150} />
            </Col>
            </Row>
            <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
                <Button htmlType="submit">Add Show Time</Button>
            </Form.Item>

        </Form>


        </>
    )
}
