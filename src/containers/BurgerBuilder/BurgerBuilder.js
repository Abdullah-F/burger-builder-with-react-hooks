import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const { onFetchIngredients } = props;

  useEffect(() => {
    onFetchIngredients();
  }, [onFetchIngredients]);

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onBuilding();
      props.onPurchaseInit();
      props.history.push("/auth");
    }
  };

  const cancelPurchaseHandler = () => {
    setPurchasing(false);
  };

  const continuePurchaseHandler = () => {
    props.onPurchaseInit();
    props.history.push("/checkout");
  };

  const disabledInfo = () => {
    const info = { ...props.ingredients };
    for (const key in info) {
      info[key] = info[key] <= 0;
    }
    return info;
  };

  const purchaseable = () => {
    const mappedBooleans = disabledInfo();
    const booleans = Object.keys(mappedBooleans).map(
      key => mappedBooleans[key]
    );
    return booleans.find(b => !b) === undefined;
  };

  const modalContent = () => {
    let content = (
      <OrderSummary
        ingredients={props.ingredients}
        cancel={cancelPurchaseHandler}
        continue={continuePurchaseHandler}
        price={props.totalPrice}
      ></OrderSummary>
    );

    if (!props.ingredients) {
      content = null;
    }
    return content;
  };

  const burgerContent = () => {
    let content = <Spinner />;
    if (props.ingredients) {
      content = (
        <Aux>
          <Burger ingredients={props.ingredients}></Burger>
          <BuildControls
            isAuthenticated={props.isAuthenticated}
            ingredientAdded={props.onAddIngredient}
            ingredientRemoved={props.onRemoveIngredient}
            disabledInfo={disabledInfo()}
            totalPrice={props.totalPrice}
            purchaseable={purchaseable()}
            ordered={purchaseHandler}
          />
        </Aux>
      );
    }
    return content;
  };
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={cancelPurchaseHandler}>
        {modalContent()}
      </Modal>
      {burgerContent()}
    </Aux>
  );
};
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: type => dispatch(actionCreators.addIngredient(type)),
    onRemoveIngredient: type => dispatch(actionCreators.removeIngredient(type)),
    onFetchIngredients: () => dispatch(actionCreators.fetchIngredients()),
    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
    onBuilding: () => dispatch(actionCreators.building())
  };
};

export default WithErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder),
  Axios
);
