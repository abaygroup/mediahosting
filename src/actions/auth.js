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
from "./types"


// Load user 
export const load_user = () => async dispatch => {
    try {
        const response = await fetch('/api/accounts/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (response.status === 200) {
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: LOAD_USER_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOAD_USER_FAIL
        });
    }
};


// Authentication check
export const check_auth_status = () => async dispatch => {
    try {
        const response = await fetch('/api/accounts/verify', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (response.status === 200) {
            dispatch({
                type: AUTHENTICATED_SUCCESS
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

// Login
export const login = (email, password) => async dispatch => {
    const body = JSON.stringify({ email, password })

    dispatch({
        type: SET_AUTH_LOADING
    })
    try {
        const response = await fetch('/api/accounts/login/', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body
        })
        if (response.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS
            })
        } else {
            dispatch({
                type: LOGIN_FAIL
            })
        }

    } catch(err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }

    dispatch({
        type: REMOVE_AUTH_LOADING
    })
}


// Logout
export const logout = () => async dispatch => {
    try {
        const response = await fetch('/api/accounts/logout', {
            method: "POST",
            headers: {
                "Accept": "application/json",
            }
        })

        if (response.status === 200) {
            dispatch({
                type: LOGOUT_SUCCESS
            }) 
        } else {
            dispatch({
                type: LOGOUT_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: LOGOUT_FAIL
        })
    }
}