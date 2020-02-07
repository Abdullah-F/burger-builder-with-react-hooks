import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {logoutSaga, logOutAfterTokenExpiresSaga, authSignInSaga, authSignUpSaga, checkAuthStatusSaga} from './auth';
import { fetchIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.LOGOUT_AFTER_TOKEN_EXPIRES, logOutAfterTokenExpiresSaga);
    yield takeEvery(actionTypes.AUTH_SIGN_IN, authSignInSaga);
    yield takeEvery(actionTypes.AUTH_SIGN_UP, authSignUpSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_STATUS, checkAuthStatusSaga);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.FETCH_INGREDIENTS, fetchIngredientsSaga);
}

export function* watchOrder(){
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}