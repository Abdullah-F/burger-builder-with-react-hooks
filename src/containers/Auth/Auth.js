import React, { Component, useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import { Redirect } from "react-router";

const Auth = props => {
  const [singUp, setSignUp] = useState(true);
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "email"
      },
      value: ""
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "password"
      },
      value: ""
    }
  });

  const inputChangedHandler = (event, id) => {
    event.preventDefault();
    let updatedForm = { ...authForm };
    let updatedFormElement = { ...updatedForm[id] };
    updatedFormElement.value = event.target.value;
    updatedForm[id] = updatedFormElement;
    setAuthForm(updatedForm);
  };

  const submintHandler = event => {
    event.preventDefault();
    const email = authForm.email.value;
    const password = authForm.password.value;

    if (singUp) {
      props.onSignUp({ email: email, password: password });
    } else {
      props.onSignIn({ email: email, password: password });
    }
  };

  function getForm() {
    let inputElements = [];
    for (let key in authForm) {
      inputElements.push({
        id: key,
        config: authForm[key]
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
        <Button buttonType="Success" clicked={submintHandler}>
          Submit
        </Button>
      </form>
    );

    if (props.loading) {
      form = <Spinner />;
    }
    if (props.isAuthenticated) {
      form = <Redirect to={props.isBuilding ? "/checkout" : "/"} />;
    }
    return form;
  }

  const switchHandler = () => {
    setSignUp(!singUp);
  };

  return (
    <div className={Classes.Auth}>
      {getForm()}
      <Button buttonType="Danger" clicked={switchHandler}>
        {singUp ? "Siwtch to Login" : "Switch To Singn Up"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    isBuilding: state.burgerBuilder.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: data => dispatch(actionCreators.authSignUp(data)),
    onSignIn: data => dispatch(actionCreators.authSignIn(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
