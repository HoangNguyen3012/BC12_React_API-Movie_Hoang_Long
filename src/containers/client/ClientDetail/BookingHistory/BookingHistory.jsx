import React from 'react'
import BookingItem from './BookingItem.jsx/BookingItem';

export default function BookingHistory(props) {
    const bookingHistory = props.userDetail.thongTinDatVe;
    console.log(bookingHistory)
    return (
        <div className="container px-3">
            <ul className="list-unstyled row row-cols-1 row-cols-lg-2">
                {bookingHistory.map((booking, idx) => idx < 6 && <BookingItem className="col" key={idx} bookingHistory={booking} />)}
            </ul>
        </div>
    )
}
