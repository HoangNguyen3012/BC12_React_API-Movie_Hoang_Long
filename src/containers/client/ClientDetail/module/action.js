import { FETCH_CLIENT_DETAIL_REQUEST, FETCH_CLIENT_DETAIL_SUCCESS, FETCH_CLIENT_DETAIL_FAIL } from './types';
import userApi from 'apis/userApi';

const actFetchClientDetailRequest = () => ({
    type: FETCH_CLIENT_DETAIL_REQUEST,
});

const actFetchClientDetailSuccess = clientDetail => ({
    type: FETCH_CLIENT_DETAIL_SUCCESS,
    payload: clientDetail,
});

const actFetchClientDetailFail = error => ({
    type: FETCH_CLIENT_DETAIL_FAIL,
    payload: error,
});

export const actFetchClientDetail = () => {
    return dispatch => {
        dispatch(actFetchClientDetailRequest())
        userApi.fetchUserInfoApi()
        .then(response => {
            dispatch(actFetchClientDetailSuccess(response.data))
        })
        .catch(error => {
            dispatch(actFetchClientDetailFail(error))
        });
    };
};