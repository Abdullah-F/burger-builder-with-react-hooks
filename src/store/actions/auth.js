import * as actionTypes from './actionTypes'
import Axios from 'axios'


const authStart = ()=>{
    return {
        type: actionTypes.AUTH_START,
    }
}

const authSuccess = (data) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        data: data,
    }
}

const authFail = (errors) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errors: errors,
    }
}


export const auth = (data)=>{
    return dispatch => {
        dispatch(authStart());
        const authDAta = {
            ...data,
            returnSecureToken: true,
        }
        Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwXQ1RzB5xEJtz0GS2-Pkz1qmn1vsgid4',
            authDAta)
        .then(
            response =>{
                console.log('[AUTH SINGN UP SUCCESS] response data', response.data)
                dispatch(authSuccess(response.data))
            }
        )
        .catch(errors =>{
            console.log('[AUTH SINGN UP FIAL] response error', errors);
            dispatch(authFail(errors));
        })
    }
}