import React, { Component } from 'react';
import Order from '../../../components/Order/Order';
import Axios from '../../../axios-orders';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {
    componentDidMount() {
        this.props.onOrdersFetch(this.props.token);
    }

    getOrders() {
        return (this.props.orders.map((order) => {
            return <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        }));
    }
    
    render() {
        return (
            <div>
                {this.getOrders()}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        orders: state.order.orders,
        token: state.auth.token,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onOrdersFetch: (token) => dispatch(actionCreators.fetchOrders(token));
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, Axios));