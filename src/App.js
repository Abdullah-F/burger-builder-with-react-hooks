import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route} from 'react-router-dom'
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut'
function App() {
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

export default App;
