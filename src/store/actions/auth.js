import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
}

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: data,
    };
}

export const authFail = (errors) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errors: errors,
    };
}


export const authSignUp = (data) => {
    return {
        type: actionTypes.AUTH_SIGN_UP,
        data: data,
    };
}

export const authLogOut = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
}

export const didLogout = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const logOutAfterTokenExpires = (expiresIn) => {
    return {
        type: actionTypes.LOGOUT_AFTER_TOKEN_EXPIRES,
        expiresIn: expiresIn,
    };
}

export const authSignIn = (data) => {
    return {
        type: actionTypes.AUTH_SIGN_IN,
        data: data,
    };
}

export const checkAuthStatus = () => {
    return {
        type: actionTypes.CHECK_AUTH_STATUS,
    };
}