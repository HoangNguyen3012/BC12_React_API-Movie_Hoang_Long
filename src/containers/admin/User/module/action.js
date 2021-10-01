import { FETCH_ALL_USER_FAIL, FETCH_ALL_USER_REQUEST, FETCH_ALL_USER_SUCCESS } from "./type";
import userApi from "apis/userApi";

const actFetchAllUserRequest = () => ({
    type: FETCH_ALL_USER_REQUEST,
});

const actFetchAllUserSucces = (user) => ({
    type: FETCH_ALL_USER_SUCCESS,
    payload: user,
});

const actFetchAllUserFail = (error) => ({
    type: FETCH_ALL_USER_FAIL,
    payload: error,
});

export const actFetchAllUser = () => {
    return dispatch => {
        dispatch(actFetchAllUserRequest())
        userApi.fetchAllUserApi()
        .then(response => {
            dispatch(actFetchAllUserSucces(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(actFetchAllUserFail(error));
        })
    }
}