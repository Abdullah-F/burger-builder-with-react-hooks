import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  function checkoutSummary() {
    let checkoutSumm = <Redirect to="/" />;
    if (props.purchased) {
      return <Redirect to="/" />;
    }
    if (props.ingredients) {
      checkoutSumm = (
        <div>
          <CheckoutSummary
            ingredients={props.ingredients}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutContinuedHandler}
          />
          <Route
            path={`${props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return checkoutSumm;
  }

  return checkoutSummary();
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
