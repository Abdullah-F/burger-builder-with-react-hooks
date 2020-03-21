import React, { useState } from "react";
import Aux from "../../hoc/Aux/Aux";
import Classes from "./Layout.module.css";
import ToolBar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  const sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };
  return (
    <Aux>
      <ToolBar
        isAuthenticated={props.isAuthenticated}
        menuButtonClicked={sideDrawerOpenHandler}
      />
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
      <main className={Classes.Content}>{props.children}</main>
    </Aux>
  );
};

const MapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
export default connect(MapStateToProps)(Layout);
