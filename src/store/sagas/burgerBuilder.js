import {put} from 'redux-saga/effects';
import * as actionCreators from '../actions/index';
import Axios from '../../axios-orders'

export function* fetchIngredientsSaga(action){
    console.log('[fetch ingrediend saga] hi')
    const response = yield Axios.get('/ingredients.json');
    yield put(actionCreators.storeIngredients(response.data));
}