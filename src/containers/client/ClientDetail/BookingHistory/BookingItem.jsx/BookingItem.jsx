import React from 'react';
import './BookingItem.scss';

export default function BookingItem(props) {
    const { bookingHistory } = props;
    console.log(bookingHistory.danhSachGhe);
    const { danhSachGhe, maVe, ngayDat, tenPhim } = bookingHistory;
    const { tenRap, tenHeThongRap, tenGhe } = danhSachGhe[0];
    return (
        <div>
            <li className="media text-left mt-2 mx-2 mx-sm-4 mx-md-5 mx-lg-2 mx-xl-3">
                {/* <img src="..." className="mr-3" alt="..." /> */}
                <div className="media-body p-2">
                    <h5 className="header mt-0 mb-1">{tenPhim}</h5>
                    <p>
                        Booking ref: <span className="text-highlight">{maVe}</span>
                        {' - '}
                        Booking date: <span className="text-highlight">{new Date(ngayDat).toLocaleDateString()}</span>
                    </p>
                    <p>
                        At <span className="text-highlight">{tenHeThongRap}</span>
                        {' - '}
                        Cinema <span className="text-highlight">{tenRap}</span>
                        {' - '}
                        Seat <span className="text-highlight">{tenGhe}</span>
                    </p>
                </div>
            </li>

        </div>
    )
}
