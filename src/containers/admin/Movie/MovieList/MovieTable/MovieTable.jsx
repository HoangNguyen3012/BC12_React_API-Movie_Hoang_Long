import React, { useState } from 'react';
import movieApi from 'apis/movieApi';
import { useSelector } from 'react-redux';
import './MovieTable.scss';
import { Button, Modal } from 'antd';
import { EditOutlined, CalendarOutlined, DeleteOutlined } from '@ant-design/icons';

export default function MovieTable(props) {
    const { listMovie } = props;
    const currentUser = useSelector(state => state.authReducer.currentUser);
    // get total number of buttons for movieList display
    let [currentPage, setCurrentPage] = useState({
        pageNumb: 1,
        searchKeyword: null,
    });
    let [modalLink, setModalLink] = useState({
        modalIsVisible: false,
        modalAction: [null, null],
        maPhim: null,
    });
    const pageNums = [];
    const itemDisplay = 6;
    for (let currentPageNum = 1; currentPageNum < (listMovie.length / itemDisplay + 1); currentPageNum++) {
        pageNums.push(currentPageNum);
    }
    // get total number of buttons for movieList display ends

    const openModal = (maPhim, action) => {
        setModalLink({
            ...modalLink,
            modalIsVisible: true,
            modalAction: action,
            maPhim: maPhim,
        });
    };

    const deleteMovie = (maPhim) => {
        movieApi.deleteMovieApi(maPhim, currentUser.accessToken)
            .then(response => {
                setModalLink({
                    ...modalLink,
                    modalIsVisible: false,
                    maPhim: null,
                });
                Modal.success({
                    title: 'Deleted successfully!',
                    content: (
                        <div>
                            <p>Movie code {maPhim} has been removed</p>
                            <p>Refresh to take effect</p>
                        </div>
                    ),
                });
            })
            .catch(error => {
                console.log(error);
                Modal.error({
                    title: 'Error!',
                    content: (
                        <div>
                            <p>There was an error removing movie code {maPhim}</p>
                        </div>
                    ),
                });
            });
    };

    return (
        <div>
            <table className="adminMovieTable">
                <thead>
                    <tr className="table__header responsive-h6">
                        <th className="col__index">Index</th>
                        <th className="col__poster">Poster</th>
                        <th className="col__movie">Movie</th>
                        <th className="col__rating">Rating</th>
                        <th className="col__premier">Premier</th>
                        <th className="col__action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listMovie.slice((currentPage.pageNumb - 1) * itemDisplay, currentPage.pageNumb * itemDisplay).map((movie, idx) => (
                        <tr className={idx % 2 === 0 ? "bg__even" : "bg__odd"} key={idx}>
                            <td className="col__index">{movie.maPhim ? movie.maPhim : null}</td>
                            <td className="col__poster">
                                <img src={movie.hinhAnh ? movie.hinhAnh : null} alt="poster" maxheight="120px" width="80px" />
                            </td>
                            <td className="col__movie">{movie.tenPhim ? movie.tenPhim : null}</td>
                            <td className="col__rating">{movie.danhGia ? movie.danhGia : null}</td>
                            <td className="col__premier">{new Date(movie.ngayKhoiChieu ? movie.ngayKhoiChieu : null).toLocaleDateString()}</td>
                            <td className="col__action">
                                <Button icon={<EditOutlined />} onClick={() => openModal(movie.maPhim, ['edit', 'movie'])}></Button>
                                {' '}
                                <Button icon={<CalendarOutlined />} onClick={() => openModal(movie.maPhim, ['edit', 'showTime'])}></Button>
                                {' '}
                                <Button icon={<DeleteOutlined />} onClick={() => openModal(movie.maPhim, ['delete', null])}></Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {/* Buttons to display list */}
            <button
            className={`btn btn-outline-info mx-1 ${currentPage.pageNumb === 1 ? "disabled" : ""}`}
            onClick={() => setCurrentPage({...currentPage, pageNumb: 1})}>
                First
            </button>
            <button
            className={`btn btn-outline-info mx-1 ${currentPage.pageNumb === 1 ? "disabled" : ""}`}
            onClick={() => setCurrentPage(
                currentPage.pageNumb !== 1 ? currentPage.pageNumb-- : 1)}>
                    Prev
            </button>
            {pageNums.map(currentPageNum => {
                return <button className={`btn btn-outline-info mx-1 ${currentPageNum === currentPage.pageNumb ? "active" : ""}`}
                onClick={() => setCurrentPage({...currentPage, pageNumb: currentPageNum})}
                key={currentPageNum}>
                    {currentPageNum}
                </button>
            })}
            <button
            className={`btn btn-outline-info mx-1 ${currentPage.pageNumb === pageNums.length ? "disabled" : ""}`}
            onClick={() => setCurrentPage({...currentPage, pageNumb: currentPage.pageNumb < pageNums.length ? currentPage.pageNumb++ : pageNums.length})}>
                    Next
            </button>
            <button
            className={`btn btn-outline-info mx-1 ${currentPage.pageNumb === pageNums.length ? "disabled" : ""}`}
            onClick={() => setCurrentPage({...currentPage, pageNumb: pageNums.length})}>
                Last
            </button>
            {/* Buttons to display list end*/}
            <Modal
                visible={modalLink.modalIsVisible}
                footer={null}
                title={modalLink.modalAction[0] === 'edit' ? "Go to edit page" : "Confirm delete"}
                closable={false}
                width={240}>
                {modalLink.modalAction[1] === 'movie' && <Button type="primary" href={`/admin/editMovie${modalLink.maPhim}`}>Go</Button>}
                {' '}
                {modalLink.modalAction[1] === 'showTime' && <Button type="primary" href={`/admin/showTime${modalLink.maPhim}`}>Go</Button>}
                {' '}
                {modalLink.modalAction[0] === 'delete' && <Button danger={true} onClick={() => deleteMovie(modalLink.maPhim)}>Delete</Button>}
                {' '}
                <Button onClick={() => setModalLink({ ...modalLink, modalIsVisible: false })}>Cancel</Button>
            </Modal>
        </div>
    )
}
