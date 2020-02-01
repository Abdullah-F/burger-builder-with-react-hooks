import * as acionTypes from './actionTypes'
import Axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData)=>{
    return {
        type: acionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}

export const purchaseBurgerFail = (error)=>{
    return {
        type: acionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    }
}

export const purchaseBurgerStart = () =>{
    return {
        type: acionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseInit = () =>{
    return {
        type: acionTypes.PURCHASE_INIT,
    }
}

export const purchaseBurger = (orderData, token)=>{
    purchaseBurgerStart()
    return dispatch => {
        Axios.post(`/orders.json?auth=${token}`, orderData)
        .then(response=>{
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(errors =>{
            dispatch(purchaseBurgerFail(errors))
        });
    }
}

export const fetchOrdersSucess = (orders)=>{
    return {
        type: acionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
}

export const fetchOrdersStart = ()=>{
    return {
        type: acionTypes.FETCH_ORDERS_START,
    }

}

export const fetchOrdersFail = (errors)=>{
    return {
        type: acionTypes.FETCH_ORDERS_FAIL,
        errors: errors,
    }
}

export const fetchOrders = (token)=>{
    return dispatch =>{
        dispatch(fetchOrdersStart())
        Axios.get(`/orders.json?auth=${token}`)
            .then((response) => {
                const fetchedOrders = []
                for (const key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSucess(fetchedOrders))
            }).catch((err) => dispatch(fetchOrdersFail))
    }
}