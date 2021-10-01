import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../Home/Banner/Banner';
import './ClientDetail.scss';
import BookingHistory from './BookingHistory/BookingHistory';
import ClientInfo from './ClientInfo/ClientInfo';
import { actFetchUserDetail } from 'containers/shared/Authentication/module/action';

export default function ClientDetail() {
    const dispatch = useDispatch();
    const { currentUser, userDetail } = useSelector(state => state.authReducer);
    useEffect(() => {
        dispatch(actFetchUserDetail({...currentUser}))
    },[])
    return (
        <>
            <Banner />
            <div className="clientDetail mb-5">
                <div className="container p-3">
                    <ul className="nav nav-tabs" id="tabClient" role="tablist" style={{paddingLeft: "15px"}}>
                        <li className="nav-item mr-2" role="presentation">
                            <a className="nav-link btn-outline-info active" id="bookingHistory-tab" data-toggle="tab" href="#bookingHistory" role="tab">Booking History</a>
                        </li>
                        <li className="nav-item mr-2" role="presentation">
                            <a className="nav-link btn-outline-info" id="clientInfo-tab" data-toggle="tab" href="#clientInfo" role="tab" >User Info</a>
                        </li>
                    </ul>
                    <div className="tab-content px-2 py-4" id="tabClientContent">
                        <div className="tab-pane fade show active" id="bookingHistory">
                            <BookingHistory userDetail={userDetail}/>
                        </div>
                        <div className="tab-pane fade" id="clientInfo">
                            <ClientInfo userDetail={userDetail} currentUser={currentUser}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
