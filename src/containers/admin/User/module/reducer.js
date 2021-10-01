import { FETCH_ALL_USER_FAIL, FETCH_ALL_USER_REQUEST, FETCH_ALL_USER_SUCCESS } from "./type";

const initialState = {
    listUser: [],
    loading: false,
    error: '', // or null
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case FETCH_ALL_USER_REQUEST:
            return { ...state, loading: true };
        case FETCH_ALL_USER_SUCCESS:
            return { ...state, listUser: payload, loading: false };
        case FETCH_ALL_USER_FAIL:
            return { ...state, error: payload, loading: false };
        default:
            return state;
    }
}

export default userReducer;