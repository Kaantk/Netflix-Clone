import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import { ProductRoute } from "./pages/ProductRoute";
import { Account } from "./pages/Account";

export const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/home"
            element={
              <ProductRoute>
                <Home />
              </ProductRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProductRoute>
                <Account />
              </ProductRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
};
