import { FETCH_ALL_MOVIE_FAIL, FETCH_ALL_MOVIE_REQUEST, FETCH_ALL_MOVIE_SUCESS } from "./types";

const initialState = {
    listMovie: [],
    loading: false,
    error: '', // or null
}

const movieReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case FETCH_ALL_MOVIE_REQUEST:
            return { ...state, loading: true };
        case FETCH_ALL_MOVIE_SUCESS:
            return { ...state, listMovie: payload, loading: false };
        case FETCH_ALL_MOVIE_FAIL:
            return { ...state, error: payload, loading: false };
        default:
            return state;
    }
}

export default movieReducer;