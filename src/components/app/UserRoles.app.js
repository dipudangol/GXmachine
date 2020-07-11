// CREATE ROLES FOR USER
export const ROLE_ADMIN = "admin";
export const ROLE_USER = "user";

// SET ACCESS ROUTES FOR ALL ROLES
export const USER_ROLES = {
  [ROLE_ADMIN]: {
    access: [
      "/", 
      "/log-in", 
      "/sign-in", 
      "/dashboard", 
      "/dashboard/:id",
      "/home",
      "/machine-status",
      "/sites",
      "/gx-machine",
      "/result",
      "/ticket",
      "/gx-machine/add",
      "/gx-machine/edit/:id",
      "/sites/add",
      "/sites/edit/:id",
      // "/machine-status/edit",
      "/machine-status/edit/:id",
      "/ticket/add",
      "/ticket/edit/:id",
      "/users",
      "/users/add",
      "/users/edit/:id",
      "/users/:id"
    ]
  },
  [ROLE_USER]: {
    access: [
      "/", 
      "/log-in", 
      "/sign-in"
    ]
  }
};