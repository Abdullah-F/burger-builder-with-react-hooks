import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Checkout/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import LogOut from "./containers/Auth/LogOut/LogOut";
import * as actionCreators from "./store/actions/index";
import { connect } from "react-redux";
const App = props => {
  useEffect(() => {
    props.onAuthCheck();
  }, [props]);

  const authenticationRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/logout" component={LogOut} />
      </Switch>
    );
  };

  const nonAuthenticationRoutes = () => {
    return (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );
  };
  return (
    <div>
      <Layout>
        {props.isAuthenticated
          ? authenticationRoutes()
          : nonAuthenticationRoutes()}
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuthCheck: () => dispatch(actionCreators.checkAuthStatus())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
