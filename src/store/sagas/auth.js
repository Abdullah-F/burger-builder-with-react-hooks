import { put } from 'redux-saga/effects';
import * as actionCreators from '../actions/index';
import { delay } from 'redux-saga/effects';
import Axios from '../../axios-orders'
export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put(actionCreators.didLogout())
}

export function* logOutAfterTokenExpiresSaga(action) {
    yield delay(action.expiresIn * 1000)
    yield put(actionCreators.authLogOut());
}

export function* authSignInSaga(action) {
    put(actionCreators.authStart());
    const authDAta = {
        ...action.data,
        returnSecureToken: true,
    }
    try {
        const response = yield Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwXQ1RzB5xEJtz0GS2-Pkz1qmn1vsgid4', authDAta)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actionCreators.authSuccess(response.data));
        yield put(actionCreators.logOutAfterTokenExpires(response.data.expiresIn));
    } catch (error) {
        yield put(actionCreators.authFail(error.response.data.error));
    }
}

export function* authSignUpSaga(action) {
    yield put(actionCreators.authStart());
    const authDAta = {
        ...action.data,
        returnSecureToken: true,
    }
    try {
        const response = yield Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwXQ1RzB5xEJtz0GS2-Pkz1qmn1vsgid4', authDAta)
        yield put(actionCreators.authSuccess(response.data))
    } catch (error) {
        yield put(actionCreators.authFail(error.responce.data.error));
    }
}

export function* checkAuthStatusSaga(){
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    const userId = localStorage.getItem('userId');
    const intervalTime = Math.floor((expirationDate-new Date())/1000);
    if (!token) {
        yield put(actionCreators.authLogOut());
    } else {
        if (expirationDate > new Date()) {
            yield put(actionCreators.authSuccess({localId: userId, idToken: token}));
            yield put(actionCreators.logOutAfterTokenExpires(intervalTime));
        }
    }
}