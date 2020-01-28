import React ,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router';
class Checkout extends Component{
    state ={
        ingredients:null,
        totalPrice:0
    }

    componentWillMount(){
        const search = this.props.location.search;
        const qParams = new URLSearchParams(search);
        let price = null;
        const ingredients = {}
        for(const param of qParams.entries()){
            if(param[0] === 'price'){
                price = param[1];
            }else{
              ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients , totalPrice: price});
    }

    checkoutCancelledHandler =()=>{
        this.props.history.goBack()
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    }

    render(){        
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={`${this.props.match.path}/contact-data`}
                    component={(props) => <ContactData ingredients={this.state.ingredients}
                    price={this.state.totalPrice} {...props}/>}/>
            </div>
        )
    }
}

export default Checkout;