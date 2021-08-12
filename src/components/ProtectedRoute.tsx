import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthState } from "../redux/reducers/authReducer";

export const ProtectedRoute = ({
  component: Component,
  admin,
  ...rest
}: RouteProps & { admin?: boolean }) => {
  const token = (
    JSON.parse(localStorage.getItem("persist:auth") ?? "") as AuthState
  )?.token;
  const user = JSON.parse(localStorage.getItem("persist:auth") ?? "")?.user;
  const isAdmin = JSON.parse(user ?? null)?.isAdmin;

  console.log(isAdmin);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token && (admin ? isAdmin : isAdmin ? false : true)) {
          //@ts-ignore
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/load",
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
