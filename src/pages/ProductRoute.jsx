import React from "react";
import { Navigate } from "react-router-dom";

export const ProductRoute = ({ children }) => {
  const CredentialUser = localStorage.getItem("CredentialUser");

  if (!CredentialUser) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};
