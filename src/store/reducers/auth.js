import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    errors: null,
    loading: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.AUTH_START):
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case (actionTypes.AUTH_SUCCESS):
            return {
                ...state,
                token: action.data.idToken,
                userId: action.data.localId,
                loading: false,
                errors: null,
            };
        case (actionTypes.AUTH_FAIL):
            return {
                ...state,
                loading: false,
                errors: action.errors,
            };
        case (actionTypes.AUTH_LOGOUT):
            return {
                ...state,
                token: null,
                userId: null,
            };
        default:
            return state;

    }
}

export default reducer;