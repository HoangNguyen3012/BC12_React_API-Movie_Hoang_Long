// import cinemaApi from "apis/cinemaApi";
// import { FETCH_ALL_CINEMA_SYSTEM_FAIL, FETCH_ALL_CINEMA_SYSTEM_REQUEST, FETCH_ALL_CINEMA_SYSTEM_SUCCESS } from "./types";

// const actFetchAllCinemaSystemRequest = () => ({
//     type: FETCH_ALL_CINEMA_SYSTEM_REQUEST,
// });

// const actFetchAllCinemaSystemSucess = listCinemaSystem => ({
//     type: FETCH_ALL_CINEMA_SYSTEM_SUCCESS,
//     payload: listCinemaSystem,
// });

// const actFetchAllCinemaSystemFail = error => ({
//     type: FETCH_ALL_CINEMA_SYSTEM_FAIL,
//     payload: error,
// });

// export const actFetchAllCinemaSystem = () => {
//     return async dispatch => {
//         dispatch(actFetchAllCinemaSystemRequest());
//         try {
//             const {data} = await cinemaApi.fetchAllCinemaSystem();
//             dispatch(actFetchAllCinemaSystemSucess(data))
//         }
//         catch(error) {
//             dispatch(actFetchAllCinemaSystemFail(error))
//         };


//     }
// }