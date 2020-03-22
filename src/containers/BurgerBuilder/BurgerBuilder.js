import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../../store/actions/index";
const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();
  const onAddIngredient = type => dispatch(actionCreators.addIngredient(type));
  const onRemoveIngredient = type =>
    dispatch(actionCreators.removeIngredient(type));
  const onFetchIngredients = useCallback(
    () => dispatch(actionCreators.fetchIngredients()),
    [dispatch]
  );
  const onPurchaseInit = () => dispatch(actionCreators.purchaseInit());
  const onBuilding = () => dispatch(actionCreators.building());

  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  useEffect(() => {
    onFetchIngredients();
  }, [onFetchIngredients]);

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onBuilding();
      onPurchaseInit();
      props.history.push("/auth");
    }
  };

  const cancelPurchaseHandler = () => {
    setPurchasing(false);
  };

  const continuePurchaseHandler = () => {
    onPurchaseInit();
    props.history.push("/checkout");
  };

  const disabledInfo = () => {
    const info = { ...ingredients };
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
        ingredients={ingredients}
        cancel={cancelPurchaseHandler}
        continue={continuePurchaseHandler}
        price={totalPrice}
      ></OrderSummary>
    );

    if (!ingredients) {
      content = null;
    }
    return content;
  };

  const burgerContent = () => {
    let content = <Spinner />;
    if (ingredients) {
      content = (
        <Aux>
          <Burger ingredients={ingredients}></Burger>
          <BuildControls
            isAuthenticated={isAuthenticated}
            ingredientAdded={onAddIngredient}
            ingredientRemoved={onRemoveIngredient}
            disabledInfo={disabledInfo()}
            totalPrice={totalPrice}
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

export default WithErrorHandler(connect(mapStateToProps)(BurgerBuilder), Axios);
