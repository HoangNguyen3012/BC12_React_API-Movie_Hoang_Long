import userApi from 'apis/userApi';
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL, FETCH_USER_DETAIL_REQUEST, FETCH_USER_DETAIL_SUCCESS, FETCH_USER_DETAIL_FAIL } from "./types";

//////////// LOG IN ////////////
const actLoginRequest = () => ({
    type: LOGIN_REQUEST,
});

const actLoginSuccess = (currentUser) => ({
    type: LOGIN_SUCCESS,
    payload: currentUser,
});

const actLoginFail = (error) => ({
    type: LOGIN_FAIL,
    payload: error,
});

export const actLogin = (user, history) => {
    return dispatch => {
        dispatch(actLoginRequest());
        userApi
            .loginApi(user)
            .then(response => {
                dispatch(actLoginSuccess(response.data));
                history.push('/');
            })
            .catch(error => {
                dispatch(actLoginFail('Unable to login!'))
            });
    };
};
//////////// LOG IN ENDS ////////////
//////////// LOG OUT ////////////
export const actLogout = () => ({
    type: LOGOUT,
    payload: null,
});
//////////// LOG OUT ENDS ////////////
//////////// SIGN UP ////////////
const actSignupRequest = () => ({
    type: SIGNUP_REQUEST,
});

const actSignupSuccess = (user) => ({
    type: SIGNUP_SUCCESS,
    payload: user,
});

const actSignupFail = (error) => ({
    type: SIGNUP_FAIL,
    payload: error,
});
export const actSignup = (user, history) => {
    return dispatch => {
        dispatch(actSignupRequest());
        userApi
            .signupApi(user)
            .then(response => {
                console.log(response.data)
                dispatch(actSignupSuccess(response.data));
                // history.push('/');
            })
            .catch(error => {
                console.log(error);
                dispatch(actSignupFail(error))
            });
    };
};
//////////// SIGN UP ENDS ////////////
//////////// FETCH USER DETAIL ////////////
const actFetchUserDetailRequest = () => ({
    type: FETCH_USER_DETAIL_REQUEST,
});

const actFetchUserDetailSuccess = (UserDetail) => ({
    type: FETCH_USER_DETAIL_SUCCESS,
    payload: UserDetail,
});

const actFetchUserDetailFail = error => ({
    type: FETCH_USER_DETAIL_FAIL,
    payload: error,
});

export const actFetchUserDetail = (user) => {
    return dispatch => {
        dispatch(actFetchUserDetailRequest());
        userApi.fetchUserInfoApi(user)
        .then(response => {
            dispatch(actFetchUserDetailSuccess(response.data));
        })
        .catch(error => {
            dispatch(actFetchUserDetailFail(error));
        });
    };
};
//////////// FETCH USER DETAIL ENDS ////////////