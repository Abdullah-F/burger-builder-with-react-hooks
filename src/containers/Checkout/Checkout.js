import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutSummary() {
        let checkoutSumm = <Redirect to='/' />;
        if(this.props.purchased){
            return <Redirect to='/' />;
        }
        if (this.props.ingredients) {
            checkoutSumm = (
                <div>
                    <CheckoutSummary ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route path={`${this.props.match.path}/contact-data`}
                        component={ContactData} />
                </div>
            );
        }
        return checkoutSumm;
    }

    render() {
        return this.checkoutSummary();
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);