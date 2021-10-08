import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchAllMovie } from '../../../client/Home/module/actions.js';
import { Button, Input, Row, Col } from 'antd';
import MovieTable from './MovieTable/MovieTable.jsx';
import Loader from 'components/Loader/Loader';
import './Movie.scss'

export default function Movie() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actFetchAllMovie());

    }, []); // componentDidMount
    const { listMovie, loading } = useSelector(state => state.movieReducer);
    const [searchState, setSearchState] = useState({
        keyword: null,
        searchList: [],
    })

    const { Search } = Input;
    const filterListMovie = (filter) => {
        const searchList = listMovie.filter(movie =>
            (movie.maPhim == filter) ||
            (movie.tenPhim === filter) ||
            (new Date(movie.ngayKhoiChieu).toLocaleDateString() === filter)
        );
        setSearchState({
            ...searchState,
            keyword: filter,
            searchList,
        })
    }



    return !loading ? (
        <div className="adminMovieListPage">
            <h2 className="responsive-h2">Movie List</h2>
            <Row>
                <Col span={4}>
                    <Button href='/admin/addMovie' type="dashed">+ Add a new movie</Button>
                </Col>
                <Col span={7}>
                </Col>
                <Col span={13}>
                    <Search
                        placeholder="find a movie"
                        allowClear
                        enterButton="Search"
                        onChange={event => filterListMovie(event.target.value)}
                        onSearch={keyword => filterListMovie(keyword)}
                    />
                </Col>
            </Row>
            <MovieTable listMovie={searchState.keyword ? searchState.searchList : listMovie} />
        </div>
    ) : (<Loader />)
}
