import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthState } from "../redux/reducers/authReducer";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}: RouteProps) => {
  const token = (
    JSON.parse(localStorage.getItem("persist:auth") ?? "") as AuthState
  ).token;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          //@ts-ignore
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/vlab-admin/load",
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
