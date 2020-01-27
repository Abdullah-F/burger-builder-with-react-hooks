import React ,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
class Checkout extends Component{
    render(){
        return (
            <div>
                <CheckoutSummary ingredients={{salad:1, bacon:1, cheese:1, meat:2}}/>
            </div>
        )
    }
}

export default Checkout;