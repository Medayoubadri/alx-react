import React from "react";

// Define default user object
export const defaultUser = {
  email: "",
  password: "",
  isLoggedIn: false,
};

// Define default logOut function
export const defaultLogOut = () => {};

// Create React context
const AppContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

export default AppContext;
