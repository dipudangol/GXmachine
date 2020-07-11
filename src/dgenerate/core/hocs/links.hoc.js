import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { USER_ROLES } from "../../../components/app/UserRoles.app";
import { PRIVATE_PATHS, PUBLIC_PATHS } from "../../../components/app/Paths.app";
import { AuthContext } from "../contexts";

export const withLink = (Component) => {
  return withRouter((props) => {

    const filteredPublicRoutes = PUBLIC_PATHS.filter(({ path, restricted, visible = true }) => {
      // GET USER ACCESS
      const { isLoggedIn, userRole } = useContext(AuthContext);
      const canAccess = userRole && USER_ROLES[userRole]['access'].indexOf(path) < 0 ? false : true;

      return restricted && isLoggedIn ? false : visible && canAccess ? true : false
    });

    const publicRoutes = {};
    filteredPublicRoutes.forEach(({ key, name, path }) => {
      publicRoutes[key] = Object.assign({}, { name, path });
    });

    const filteredPrivateRoutes = PRIVATE_PATHS.filter(({ path, visible = true }) => {
      // GET USER ACCESS
      const { isLoggedIn, userRole } = useContext(AuthContext);
      const canAccess = userRole && USER_ROLES[userRole]['access'].indexOf(path) < 0 ? false : true;

      return isLoggedIn ?
        visible && canAccess ? true : false : false
    });

    const privateRoutes = {};
    filteredPrivateRoutes.forEach(({ key, name, path }) => {
      privateRoutes[key] = Object.assign({}, { name, path });
    });

    return (
      <Component
        {...props}
        navigation={{
          routes: { ...publicRoutes, ...privateRoutes },
          navigate: (path) => {
            props.history.push(path);
          }
        }}
      />
    )
  })
}