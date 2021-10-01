import { FETCH_ALL_MOVIE_FAIL, FETCH_ALL_MOVIE_REQUEST, FETCH_ALL_MOVIE_SUCESS } from "./types";
import movieApi from "apis/movieApi"

// export const actFetchAllMovie = listMovie => ({
//     type: FETCH_ALL_MOVIE,
//     payload: listMovie,
// })

const actFetchAllMovieRquest = () => ({
    type: FETCH_ALL_MOVIE_REQUEST,
})

const actFetchAllMovieSucess = (listMovie) => ({
    type: FETCH_ALL_MOVIE_SUCESS,
    payload: listMovie,
})

const actFetchAllMovieFail = error => ({
    type: FETCH_ALL_MOVIE_FAIL,
    payload: error
})

export const actFetchAllMovie = () => {
    return (dispatch, getState) => {
        // Change loading to true before sending request Api
        dispatch(actFetchAllMovieRquest());

        movieApi.fetchAllMovieApi()
        .then(res =>{
            // console.log(res)
            dispatch(actFetchAllMovieSucess(res.data))
        })
        .catch(err =>{
            dispatch(actFetchAllMovieFail(err))
        })
    }
}