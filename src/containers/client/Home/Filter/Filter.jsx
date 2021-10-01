import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchAllMovie } from '../module/actions';
import Loader from 'components/Loader/Loader';
import MovieList from '../MovieList/MovieList';

export default function Filter() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actFetchAllMovie());
    }, []); // componentDidMount
    const { listMovie, loading } = useSelector(state => state.movieReducer);

    if (loading) return <Loader />;
    return (
        <div style={{ minHeight: "300px" }}>
            <ul className="nav nav-pills" id="pills-tab" role="tablist" style={{ paddingLeft: "15px" }}>
                <li className="nav-item mr-2" role="presentation">
                    <a className="nav-link btn-info active" id="pills-all-tab" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true">All</a>
                </li>
                <li className="nav-item mr-2" role="presentation">
                    <a className="nav-link btn-info" id="pills-upcoming-tab" data-toggle="pill" href="#pills-upcoming" role="tab" aria-controls="pills-upcoming" aria-selected="false">Upcoming</a>
                </li>
                <li className="nav-item mr-2" role="presentation">
                    <a className="nav-link btn-info" id="pills-rating-tab" data-toggle="pill" href="#pills-rating" role="tab" aria-controls="pills-rating" aria-selected="false">Highest Rating</a>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                    <MovieList listMovie={listMovie} />
                </div>
                <div className="tab-pane fade" id="pills-upcoming" role="tabpanel" aria-labelledby="pills-upcoming-tab">
                    <MovieList listMovie={listMovie.filter(movie => movie.ngayKhoiChieu > new Date().toString())} />
                </div>
                <div className="tab-pane fade" id="pills-rating" role="tabpanel" aria-labelledby="pills-rating-tab">
                    <MovieList listMovie={listMovie.slice().sort((a, b) => b.danhGia - a.danhGia)} />
                </div>
            </div>
        </div>

    )
}
