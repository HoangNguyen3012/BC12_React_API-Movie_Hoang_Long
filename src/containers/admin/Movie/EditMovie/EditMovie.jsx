import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { actFetchMovieDetail } from 'containers/client/MovieDetail/module/actions';
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

export default function EditMovie(props) {
    const { movieId } = useParams(); // props.match.params
    const dispatch = useDispatch(); // mapDispatchToProps
    const { loading, movieDetail } = useSelector(state => state.movieDetailReducer); // mapStatetoProps
    const currentUser = useSelector(state => state.authReducer.currentUser);

    useEffect(() => {
        dispatch(actFetchMovieDetail(movieId));
    }, []);

    const [imgSrc, setImgSrc] = useState(null);
    const { TextArea } = Input;
    const form = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: movieDetail?.maPhim,
            tenPhim: movieDetail?.tenPhim,
            moTa: movieDetail?.moTa,
            ngayKhoiChieu: movieDetail?.ngayKhoiChieu,
            trailer: movieDetail?.trailer,
            // dangChieu: movieDetail?.dangChieu,
            // sapChieu: false,
            // hot: false,
            danhGia: movieDetail?.danhGia,
            hinhAnh: null,
            maNhom: currentUser.maNhom,
        },
        onSubmit: (value) => {
            console.log('Received', value);

            // Create formData
            let formData = new FormData();
            for (let key in value) {
                if (key !== 'hinhAnh') {
                    formData.append(key, value[key]);
                } else if(value.hinhAnh !== null) {
                    formData.append('File', value.hinhAnh, value.hinhAnh.name);
                }
            }
            console.log(formData.get('File'))
            movieApi.editMovieUploadPictureApi(formData, currentUser.accessToken)
                .then(response => {
                    console.log(response);
                    Modal.success({
                        title: 'Update successfully!',
                        content: (
                            <div>
                                <p>Movie {form.values.tenPhim} was updated</p>
                            </div>
                        ),
                    });
                    props.history.push('/admin/movie');
                })
                .catch(error => {
                    console.log(error);
                    Modal.error({
                        title: 'Update failed',
                        content: (
                            <div>
                                <p>Facing error {error}</p>
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
    // console.log(form)

    const handleChangeDatePicker = value => {
        let ngayKhoiChieu = moment(value);
        form.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
    }

    const handleChangeFile = async (event) => {
        // extract file from event, since input can take several items, we only need the first one
        console.log(event.target.files)
        if (event.target.files.length === 0) {
            form.setFieldValue('hinhAnh', {});
            setImgSrc(null);
            return;
        }
        let file = event.target.files[0];
        await form.setFieldValue('hinhAnh', file);

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

    return loading ? <Loader /> : (
        <>
            <h3>Editing Movie {movieId}</h3>
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onSubmitCapture={form.handleSubmit}
                // initialValues={form.initialValues}
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
                    <Input onChange={handleChange} name="tenPhim" value={form.values.tenPhim}/>
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
                    <Input onChange={handleChange} name="trailer" value={form.values.trailer}/>
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
                    <TextArea rows={3} allowClear onChange={handleChange} name="moTa" value={form.values.moTa}/>
                </Form.Item>
                <Form.Item
                    label="Premier Date"
                >
                    <DatePicker format='DD/MM/YYYY' onChange={handleChangeDatePicker} defaultValue={moment(form.values.ngayKhoiChieu,false)}/>
                </Form.Item>
                {/* <Form.Item label="Now Showing">
                    <Switch onChange={handleChangeSwitch('dangChieu')} defaultChecked={form.values.dangChieu}/>
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} defaultChecked={form.values.hot}/>
                </Form.Item>
                <Form.Item label="Coming Soon">
                    <Switch onChange={handleChangeSwitch('sapChieu')} defaultChecked={form.values.sapChieu}/>
                </Form.Item> */}
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
                    <InputNumber min={1} max={10} onChange={value => form.setFieldValue('danhGia', value)} value={form.values.danhGia}/>
                </Form.Item>
                <Form.Item label="Movie Poster">
                    <label className="custome__input__file">
                        <input id="input__file" type="file" onChange={handleChangeFile} accept="image/png, image/jpg, image/jpeg, image/gif" />
                        Upload Poster File
                    </label>
                    <img src={imgSrc ? imgSrc : movieDetail?.hinhAnh} alt="poster" height={120} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
                    <Button htmlType="submit">Submit Changes</Button>
                </Form.Item>
            </Form>
        </>
    )
}
