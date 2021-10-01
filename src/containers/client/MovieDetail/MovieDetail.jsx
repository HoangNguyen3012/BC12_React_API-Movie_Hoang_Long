import React, {useEffect} from 'react';
import Loader from 'components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './MovieDetail.scss';
import { actFetchMovieDetail } from './module/actions';

export default function MovieDetail(props) {
    const { movieId } = useParams(); // props.match.params
    const dispatch = useDispatch(); // mapDispatchToProps
    const { loading, movieDetail } = useSelector( state => state.movieDetailReducer); // mapStatetoProps

    useEffect(() => {
        dispatch(actFetchMovieDetail(movieId));
    }, [])

    if(loading) return <Loader />

    return movieDetail && (
        <div className="mt-5">
            <div className="movieDetail container">
                <div className="row">
                    <div className="col-5 col-sm-4 col-lg-3">
                        <img className="img-fluid" src={movieDetail.hinhAnh} alt="" />
                    </div>
                    <div className="col-7 col-sm-8 col-lg-9">
                        <h2>{movieDetail.tenPhim}</h2>
                        <h5>Premier on {new Date(movieDetail.ngayKhoiChieu).toLocaleDateString()}</h5>
                        <p>{movieDetail.moTa}</p>
                        <h5>Rating: {movieDetail.danhGia}*</h5>
                        <a className="btn btn-success" href={movieDetail.trailer}>Watch Trailer</a>
                    </div>
                </div>
            </div>
            <div className="showTime mt-3 pt-3 pb-5">
                <div className="container">
                    <h1 className="col-9 ml-auto">Show Time</h1>
                    <div className="row showTime__content">
                        <div className="col-3 content__left">
                            <div className="nav flex-column nav-pills text-left" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {movieDetail.heThongRapChieu.map((heThongRap, idx) => {
                                    return (
                                        <a className={`left-logo nav-link mr-0 ${idx === 0 ? 'active' : ''}`} id="v-pills-home-tab" data-toggle="pill" href={`#${heThongRap.maHeThongRap}`} role="tab" aria-controls={heThongRap.maHeThongRap} key={idx} aria-selected="true">
                                            <img src={heThongRap.logo} alt=""/>
                                            <span className="cinemaName">{heThongRap.tenHeThongRap}</span>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-9 content__right">
                            <div className="tab-content" id="v-pills-tabContent">
                                {movieDetail.heThongRapChieu.map((heThongRap, idx) => {
                                    return (
                                        <div className={`tab-pane fade show ${idx === 0 ? 'active' : ''}`} id={heThongRap.maHeThongRap} role="tabpanel" aria-labelledby="v-pills-home-tab" key={idx}>
                                            {heThongRap.cumRapChieu.map((cumRap, idx) => {
                                                return (
                                                    <div className="text-left" key={idx}>
                                                        <img src={cumRap.hinhAnh} alt="" style={{width: '50px', marginRight: '6px'}} />
                                                        <span className="cinema__name">{cumRap.tenCumRap}</span>
                                                        <div className="my-2">
                                                            {cumRap.lichChieuPhim.map((lichChieu, idx) => {
                                                                return (
                                                                    <Link to={`/seat-plan/${lichChieu.maLichChieu}`} className="btn btn-info mr-3 mb-3" key={idx}>{new Date(lichChieu.ngayChieuGioChieu).toLocaleTimeString()}</Link>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
