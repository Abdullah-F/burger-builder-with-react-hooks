import React, { Component, useState } from "react";
import Button from "../../../components/UI/Button/Button";
import Classes from "./ContactData.module.css";
import Axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actionCreators from "../../../store/actions/index";
import { connect } from "react-redux";
const ContactData = props => {
  const [orderForm, setOrderFrom] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "email"
      },
      value: "hdhdhd@some.com"
    },
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "Abdullah Fadhel"
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street"
      },
      value: "Faisal street"
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "54545"
      },
      value: "zip code"
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country"
      },
      value: "Yemen"
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      value: "Abdullah Fadhel"
    }
  });

  const orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let key in orderForm) {
      formData[key] = orderForm[key].value;
    }
    const order = {
      orderData: formData,
      ingredients: props.ingredients,
      price: props.price
    };
    props.onOrderBurger(order, props.token);
  };

  function getForm() {
    let inputElements = [];
    for (let key in orderForm) {
      inputElements.push({
        id: key,
        config: orderForm[key]
      });
    }
    inputElements = inputElements.map(element => {
      return (
        <Input
          changed={event => inputChangedHandler(event, element.id)}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          key={element.id}
        />
      );
    });
    let form = (
      <form>
        {inputElements}
        <Button buttonType="Success" clicked={orderHandler}>
          Order
        </Button>
      </form>
    );

    if (props.loading) {
      form = <Spinner />;
    }
    return form;
  }

  const inputChangedHandler = (event, id) => {
    event.preventDefault();
    let updatedForm = { ...orderForm };
    let updatedFormElement = { ...updatedForm[id] };
    updatedFormElement.value = event.target.value;
    updatedForm[id] = updatedFormElement;
    setOrderFrom(updatedForm);
  };
  return (
    <div className={Classes.ContactData}>
      <h4>Enter Your Conact Date :</h4>
      {getForm()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    price: state.burgerBuilder.totalPrice,
    ingredients: state.burgerBuilder.ingredients,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionCreators.purchaseBurger(orderData, token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, Axios));
