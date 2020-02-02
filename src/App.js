import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route} from 'react-router-dom'
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut'
import * as actionCreators from './store/actions/index'
import { connect } from 'react-redux';
class App extends Component {
  componentDidMount(){
    console.log('[APP] props',this.props);
    this.props.onAuthCheck();
  }
  render(){
  return (
    <div >
      <Layout>
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/auth' exact component={Auth}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/logout' component={LogOut}/>
      </Layout>
    </div>
  );
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    onAuthCheck: () => dispatch(actionCreators.checkAuthStatus()),
  }
}

export default connect(null, mapDispatchToProps)(App);
