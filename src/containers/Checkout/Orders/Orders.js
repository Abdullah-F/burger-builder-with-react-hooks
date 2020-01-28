import React, { Component } from 'react'
import Order from '../../../components/Order/Order'
import Axios from '../../../axios-orders'
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        Axios.get('/orders.json')
            .then((response) => {
                const fetchedOrders = []
                for (const key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false, orders:fetchedOrders });
            }).catch((err) => this.setState({ loading: false }))
    }

    getOrders() {
        return (this.state.orders.map((order) => {
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

export default WithErrorHandler(Orders, Axios);