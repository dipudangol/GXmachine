// @Not Required
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { USER_ROLES } from "../../../components/app/UserRoles.app";
import { AuthContext } from "../contexts";

export const PublicLink = ({ name, path, restricted, visible, children }) => {
  // GET USER ACCESS
  const { isLoggedIn, userRole } = useContext(AuthContext);
  const canAccess = userRole && USER_ROLES[userRole]['access'].indexOf(path) < 0 ? false : true;

  return restricted && isLoggedIn ? 
    null : visible && canAccess ? children ? children : <Link to={path}>{ name }</Link> : null
}

PublicLink.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  restricted: PropTypes.bool.isRequired,
  visible: PropTypes.bool,
  children: PropTypes.node
};

PublicLink.defaultProps = {
  visible: true,
  children: null
};

export const PrivateLink = ({ name, path, visible, children }) => {
  // GET USER ACCESS
  const { isLoggedIn, userRole } = useContext(AuthContext);
  const canAccess = userRole && USER_ROLES[userRole]['access'].indexOf(path) < 0 ? false : true;

  return isLoggedIn ? 
    visible && canAccess ? children ? children : <Link to={path}>{ name }</Link> : null : null
}

PrivateLink.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  visible: PropTypes.bool,
  children: PropTypes.node
};

PrivateLink.defaultProps = {
  visible: true,
  children: null
};
