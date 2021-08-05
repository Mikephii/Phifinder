import React, { Fragment } from "react";
//import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomRouter from "./CustomRouter";

const AuthRoute = ({ component: Component, authenticated }) => {
  return authenticated === true ? (
    <CustomRouter href="/login" />
  ) : (
    <Component />
  );
};

AuthRoute.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
  };
};

export default connect(mapStateToProps)(AuthRoute);
