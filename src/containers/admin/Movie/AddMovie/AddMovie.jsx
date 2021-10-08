import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
    Switch,
    Modal
} from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import movieApi from 'apis/movieApi';
import './AddMovie.scss';


const AddMovie = (props) => {

    const [imgSrc, setImgSrc] = useState(null);
    const maNhom = useSelector(state => state.authReducer.currentUser.maNhom);
    const { TextArea } = Input;
    const form = useFormik({
        initialValues: {
            tenPhim: '',
            moTa: '',
            ngayKhoiChieu: '',
            trailer: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {name: null},
            maNhom,
        },
        onSubmit: (value) => {
            console.log('Received', value);

            // Create formData
            let formData = new FormData();
            for (let key in value) {
                if (key !== 'hinhAnh') {
                    formData.append(key, value[key]);
                } else {
                    formData.append('File', value.hinhAnh, value.hinhAnh.name);
                }
            }
            console.log(formData.get('File'))
            movieApi.addMovieUploadPictureApi(formData)
                .then(response => {
                    console.log(response);
                    Modal.success({
                        title: 'Added successfully!',
                        content: (
                            <div>
                                <p>New Movie {form.values.tenPhim} has been added</p>
                            </div>
                        ),
                        onOk: () => props.history.push('/admin/movie')
                    });

                })
                .catch(error => {
                    console.log(error);
                    Modal.error({
                        title: 'Found an error!',
                        content: (
                            <div>
                                <p>Error code {error}</p>
                            </div>
                        ),
                    })
                });
            form.resetForm();
        }
    })

    const handleChange = event => {
        const { name, value } = event.target;
        form.setFieldValue(name, value);
    };

    const handleChangeDatePicker = value => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
        form.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            form.setFieldValue(name, value);
        }
    };

    const handleChangeFile = (event) => {
        // extract file from event, since input can take several items, we only need the first one
        console.log(event.target.files)
        if (event.target.files.length === 0) {
            form.setFieldValue('hinhAnh', {});
            setImgSrc(null);
            return;
        }
        let file = event.target.files[0];
        form.setFieldValue('hinhAnh', file);

        // Display picture for user to test
        switch (file.type) {
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/png':
                // create a file reader
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    setImgSrc(event.target.result)
                };
                break;
            default:
                setImgSrc(null)
                break;
        }
    };

    return (
        <>
            <h3>Add New</h3>
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onSubmitCapture={form.handleSubmit}
                initialValues={form.initialValues}
                validateTrigger="onBlur"
                style={{ textAlign: 'left' }}
            >
                <Form.Item
                    label="Movie"
                    rules={[
                        {
                            required: true,
                            message: 'Input Movie Name'
                        }
                    ]}
                >
                    <Input onChange={handleChange} name="tenPhim" />

                </Form.Item>
                <Form.Item
                    label="Trailer URL"
                    rules={[
                        {
                            required: true,
                            message: 'Input Trailer URL'
                        }
                    ]}
                >
                    <Input onChange={handleChange} name="trailer" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: 'Input Trailer URL'
                        }
                    ]}
                >
                    <TextArea rows={3} allowClear onChange={handleChange} name="moTa" />
                </Form.Item>
                <Form.Item
                    label="Premier Date"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose a Premier Date'
                        }
                    ]}
                >
                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
                </Form.Item>
                <Form.Item label="Now Showing">
                    <Switch onChange={handleChangeSwitch('dangChieu')} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} />
                </Form.Item>
                <Form.Item label="Coming Soon">
                    <Switch onChange={handleChangeSwitch('sapChieu')} />
                </Form.Item>
                <Form.Item
                    label="Rating"
                    rules={[
                        {
                            required: true,
                            message: 'Please give it a rating',
                            validationTrigger: 'onBlur',
                        }
                    ]}
                >
                    <InputNumber min={1} max={10} onChange={value => form.setFieldValue('danhGia', value)} />
                </Form.Item>
                <Form.Item label="Movie Poster">
                    <label className="custome__input__file">
                        <input id="input__file" type="file" onChange={handleChangeFile} accept="image/png, image/jpg, image/jpeg, image/gif" />
                        Upload Poster File
                    </label>
                    <img src={imgSrc} alt="poster" height={120} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
                    <Button htmlType="submit">Add Movie</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddMovie;