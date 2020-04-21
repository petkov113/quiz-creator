import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { Redirect } from "react-router-dom";

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);
  return <Redirect to="/"/>
};

export default connect(null, { logout })(Logout);
