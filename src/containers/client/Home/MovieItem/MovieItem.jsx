import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieItem.scss';

export default class MovieItem extends Component {
    render() {
        const { tenPhim, hinhAnh, maPhim, ngayKhoiChieu } = this.props.movie;

        return (
            <div className="col-lg-3 col-sm-6 movieItem">
                <div className="card">
                    <img className="card-img-top" src={hinhAnh !== ''? hinhAnh : ('Coming Soon')} alt='Coming Soon'/>
                    <div className="card-body" style={{backgroundColor: "#ffffff"}}>
                        <h4 className="card-title text-truncate ">{tenPhim}</h4>
                        <h6 className="card-text text-truncate">Show time: {new Date(ngayKhoiChieu).toLocaleDateString()}</h6>
                        <Link to={`/movie-detail/${maPhim}`} className="btn btn-info">View Detail</Link>
                    </div>
                </div>
            </div>

        )
    }
}
