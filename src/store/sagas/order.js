import { put } from 'redux-saga/effects';
import * as actionCreators from '../actions/index';
import Axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
    yield put(actionCreators.purchaseBurgerStart());
    try {
        const response = yield Axios.post(`/orders.json?auth=${action.token}`, action.orderData);
        yield put(actionCreators.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actionCreators.purchaseBurgerFail(error.response.data.error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actionCreators.fetchOrdersStart());
    try {
        const response = yield Axios.get(`/orders.json?auth=${action.token}`);
        const fetchedOrders = [];
        for (const key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            })
        }
        yield put(actionCreators.fetchOrdersSucess(fetchedOrders));
    } catch (error) {
        yield put(actionCreators.fetchOrdersFail(error.response.data.error));
    }
}