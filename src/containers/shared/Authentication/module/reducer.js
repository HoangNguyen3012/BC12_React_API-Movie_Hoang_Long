import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL, FETCH_USER_DETAIL_REQUEST, FETCH_USER_DETAIL_SUCCESS, FETCH_USER_DETAIL_FAIL } from "./types";

const initialState = {
    currentUser: null,
    userDetail: null,
    loading: false,
    error: null,
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null }
        case LOGIN_SUCCESS:
            return { ...state, loading: false, currentUser: payload }
        case LOGIN_FAIL:
            return { ...state, loading: false, error: payload }
        case LOGOUT:
            return { ...state, currentUser: payload }
        case SIGNUP_REQUEST:
            return { ...state, loading: true, error: null }
        case SIGNUP_SUCCESS:
            return { ...state, loading: false, currentUser: payload }
        case SIGNUP_FAIL:
            return { ...state, loading: false, error: payload }
        case FETCH_USER_DETAIL_REQUEST:
            return { ...state, loading: true, error: null }
        case FETCH_USER_DETAIL_SUCCESS:
            return { ...state, loading: false, userDetail: payload }
        case FETCH_USER_DETAIL_FAIL:
            return { ...state, loading: false, error: payload }
        default:
            return state
    }
}


export default authReducer;