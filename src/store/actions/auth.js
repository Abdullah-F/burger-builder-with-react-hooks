import * as actionTypes from './actionTypes'
import Axios from 'axios'


const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: data,
    }
}

const authFail = (errors) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errors: errors,
    }
}


export const authSignUp = (data) => {
    return dispatch => {
        dispatch(authStart());
        const authDAta = {
            ...data,
            returnSecureToken: true,
        }
        Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwXQ1RzB5xEJtz0GS2-Pkz1qmn1vsgid4',
            authDAta)
            .then(
                response => {
                    dispatch(authSuccess(response.data))
                }
            )
            .catch(errors => {
                dispatch(authFail(errors));
            })
    }
}

export const authLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logOutAfterTokenExpires = (expiresIn) => {
    return (dispatch) => setTimeout(() => dispatch(authLogOut()), expiresIn * 1000);
}

export const authSignIn = (data) => {
    return dispatch => {
        dispatch(authStart());
        const authDAta = {
            ...data,
            returnSecureToken: true,
        }
        Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwXQ1RzB5xEJtz0GS2-Pkz1qmn1vsgid4',
            authDAta)
            .then(
                response => {
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('expirationDate', expirationDate)
                    localStorage.setItem('userId', response.data.localId);
                    dispatch(authSuccess(response.data));
                    dispatch(logOutAfterTokenExpires(response.data.expiresIn));
                }
            )
            .catch(errors => {
                dispatch(authFail(errors));
            })
    }
}



export const checkAuthStatus = (data) => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const userId = localStorage.getItem('userId');
        const intervalTime = Math.floor((expirationDate-new Date())/1000);
        if (!token) {
            dispatch(authLogOut());
        } else {
            if (expirationDate > new Date()) {
                dispatch(authSuccess({localId: userId, idToken: token}));
                dispatch(logOutAfterTokenExpires(intervalTime));
            }
        }
    }
}