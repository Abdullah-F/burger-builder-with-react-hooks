import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut'
import * as actionCreators from './store/actions/index'
import { connect } from 'react-redux';
class App extends Component {
  componentDidMount() {
    this.props.onAuthCheck();
  }

  authenticationRoutes() {
    return (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/orders' component={Orders} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/logout' component={LogOut} />
      </Switch>
    );
  }

  nonAuthenticationRoutes() {
    return (
      <Switch>
        <Route path='/auth' exact component={Auth} />
        <Route path='/' component={BurgerBuilder} />
      </Switch>
    );
  }
  render() {
    return (
      <div >
        <Layout>
          {this.props.isAuthenticated? this.authenticationRoutes(): this.nonAuthenticationRoutes()}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    isAuthenticated: state.auth.token !== null,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: () => dispatch(actionCreators.checkAuthStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
