import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { USER_ROLES } from "../../../components/app/UserRoles.app";
import { PRIVATE_PATHS, PUBLIC_PATHS } from "../../../components/app/Paths.app";
import { AuthContext } from "../contexts";

// PRIVATE ROUTES
export const PrivateRoute = ({ component: Component, ...rest }) => {

  const initialPublicPath = PUBLIC_PATHS.length > 0 ? PUBLIC_PATHS[0] : null;
  const redirectToPath = initialPublicPath["path"];
  
  // GET USER ACCESS
  const { isLoggedIn, userRole } = useContext(AuthContext);
  const canAccess = userRole && USER_ROLES[userRole]['access'].indexOf(rest.path) < 0 ? false : true;
  
  return <Route
    {...rest}
    render = {props => {
      return isLoggedIn ?
      userRole && canAccess ? 
      <Component {...props} /> : 
        <Redirect to={ redirectToPath } /> : 
          <Redirect to="/log-in" />
    }}
  />
}

// PUBLIC OR RESTRICTED ROUTES
export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  
  const initialPrivatePath = PRIVATE_PATHS.length > 0 ? PRIVATE_PATHS[0] : null;
  const redirectToPath = initialPrivatePath["path"];

  // GET USER ACCESS
  const { isLoggedIn, userRole } = useContext(AuthContext);
  const canAccess = userRole && USER_ROLES[userRole]['access'].indexOf(rest.path) < 0 ? false : true;

  return <Route 
    {...rest}
    render = {props => {
      return isLoggedIn && restricted ?
        <Redirect to={ redirectToPath } /> : 
          userRole && canAccess ? 
            <Component {...props} /> : 
              <Redirect to="/user-denied" />
    }}
  />
}