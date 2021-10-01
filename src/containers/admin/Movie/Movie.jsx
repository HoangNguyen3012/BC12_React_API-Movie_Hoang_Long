import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { actFetchAllMovie } from '../../client/Home/module/actions.js';
import { Table, Button, Modal, Form, Input, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Loader from 'components/Loader/Loader';
import './Movie.scss'

export default function Movie() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actFetchAllMovie());
        console.log(listMovie);
        const { hinhAnh, maPhim, tenPhim, danhGia, ngayKhoiChieu } = listMovie[0];
    }, []); // componentDidMount
    const { listMovie, loading } = useSelector(state => state.movieReducer);
    console.log(listMovie);
    // const { hinhAnh, maPhim, tenPhim, danhGia, ngayKhoiChieu } = listMovie[0];

    return !loading ? (
        <div className="adminMovieListPage">
            <h2 className="responsive-h2">Movie List</h2>
            <table className="adminMovieList">
                <thead>
                    <tr className="table__header responsive-h6">
                        <th className="header__index">Index</th>
                        <th className="header__poster">Poster</th>
                        <th className="header__movie">Movie</th>
                        <th className="header__rating">Rating</th>
                        <th className="header__premier">Premier</th>
                        <th className="header__action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listMovie.map(movie => (
                        <tr>
                            <td>{movie.maPhim ? movie.maPhim : null}</td>
                            <td>
                                <img src={movie.hinhAnh ? movie.hinhAnh : null} alt="poster" height="120px" />
                            </td>
                            <td>{movie.tenPhim ? movie.tenPhim : null}</td>
                            <td>{movie.danhGia ? movie.danhGia : null}</td>
                            <td>{new Date(movie.ngayKhoiChieu ? movie.ngayKhoiChieu : null).toLocaleDateString()}</td>
                            <td>
                                <Button icon={<EditOutlined />}></Button>
                                <Button icon={<DeleteOutlined />}></Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    ) : (<Loader />)
}
