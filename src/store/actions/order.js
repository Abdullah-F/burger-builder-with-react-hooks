import * as acionTypes from './actionTypes'

export const purchaseBurgerSuccess = (id, orderData)=>{
    return {
        type: acionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
}

export const purchaseBurgerFail = (error)=>{
    return {
        type: acionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
}

export const purchaseBurgerStart = () =>{
    return {
        type: acionTypes.PURCHASE_BURGER_START,
    };
}

export const purchaseInit = () =>{
    return {
        type: acionTypes.PURCHASE_INIT,
    };
}

export const purchaseBurger = (orderData, token)=>{
    return {
        type: acionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token,
    };
}

export const fetchOrdersSucess = (orders)=>{
    return {
        type: acionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
}

export const fetchOrdersStart = ()=>{
    return {
        type: acionTypes.FETCH_ORDERS_START,
    };

}

export const fetchOrdersFail = (errors)=>{
    return {
        type: acionTypes.FETCH_ORDERS_FAIL,
        errors: errors,
    };
}

export const fetchOrders = (token)=>{
    return {
        type: acionTypes.FETCH_ORDERS,
        token: token,
    };
}