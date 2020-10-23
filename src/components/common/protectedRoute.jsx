import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const token = useSelector((state) => state.entities.user.token);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) return <Redirect to='/' />;
        return Component ? <Component /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
