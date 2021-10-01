import React, { useState } from 'react';
import MovieItem from '../MovieItem/MovieItem';

export default function MovieList(props) {
    const { listMovie } = props;
    // get total number of buttons for movieList display
    let [pageNumb, setPageNumb] = useState(1);
    const pageNums = [];
    const itemDisplay = 8;
    for (let currentPageNum = 1; currentPageNum < (listMovie.length / itemDisplay + 1); currentPageNum++) {
        pageNums.push(currentPageNum);
    }
    // get total number of buttons for movieList display ends
    const getCurrentMovieList = ( pageNum ) => {
        return listMovie.slice( (pageNum-1)*itemDisplay, pageNum*itemDisplay );
    };

    return listMovie.length !== 0 ? (
        <div className="container pb-3">
            <div className="row" id="renderMovieList">
                {getCurrentMovieList(pageNumb).map((movie, index) => {
                    return (index < itemDisplay) && <MovieItem movie={movie} key={movie.maPhim} />
                })}
            </div>
            {/* Buttons to display list */}
            <button className={`btn btn-outline-info mx-1 ${pageNumb === 1 ? "disabled" : ""}`} onClick={() => setPageNumb(1)}>First</button>
            <button className={`btn btn-outline-info mx-1 ${pageNumb === 1 ? "disabled" : ""}`} onClick={() => setPageNumb(
                pageNumb !== 1 ? pageNumb-- : 1)}>Prev</button>
            {pageNums.map(currentPageNum => {
                return <button className={`btn btn-outline-info mx-1 ${currentPageNum === pageNumb ? "active" : ""}`} onClick={() => setPageNumb(currentPageNum)} key={currentPageNum}>{currentPageNum}</button>
            })}
            <button className={`btn btn-outline-info mx-1 ${pageNumb === pageNums.length ? "disabled" : ""}`} onClick={() => setPageNumb(
                pageNumb < pageNums.length ? pageNumb ++ : pageNums.length)}>Next</button>
            <button className={`btn btn-outline-info mx-1 ${pageNumb === pageNums.length ? "disabled" : ""}`} onClick={() => setPageNumb(pageNums.length)}>Last</button>
            {/* Buttons to display list end*/}
        </div>
    ) : (
        <h3>Coming soon</h3>
    )
}
