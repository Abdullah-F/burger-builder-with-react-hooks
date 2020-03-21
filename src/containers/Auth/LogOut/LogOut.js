import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
const LogOut = props => {
  useEffect(() => {
    props.onLogOut();
  });

  return <Redirect to="/auth" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(actionCreators.authLogOut())
  };
};

export default connect(null, mapDispatchToProps)(LogOut);
