// const { FETCH_ALL_CINEMA_SYSTEM_REQUEST, FETCH_ALL_CINEMA_SYSTEM_SUCCESS, FETCH_ALL_CINEMA_SYSTEM_FAIL } = require("./types");


// const initialState = {
//     listCinemaSystem: [],
//     loading: false,
//     error: null,
// }

// const cinemaSystemReducer = (state = initialState, { type, payload }) => {
//     switch (type) {
//         case FETCH_ALL_CINEMA_SYSTEM_REQUEST:
//             return { ...state, loading: true };
//         case FETCH_ALL_CINEMA_SYSTEM_SUCCESS:
//             return { ...state, loading: false, listCinemaSystem: payload };
//         case FETCH_ALL_CINEMA_SYSTEM_FAIL:
//             return { ...state, loading: false, error: payload };
//         default:
//             return state;
//     }
// }

// export default cinemaSystemReducer;