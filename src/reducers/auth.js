import { 
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT_FAIL, 
    LOGOUT_SUCCESS, 
    REMOVE_AUTH_LOADING, 
    SET_AUTH_LOADING 
} 

from "../actions/types";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false
};

const authReducer = (state=initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_SUCCESS: 
            return {
                ...state,
                isAuthenticated: false
            }
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload.user
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case LOGIN_FAIL:
            return {
                ...state
            }
        case LOGOUT_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default authReducer;