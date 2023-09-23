import React from "react";
import Home from "../pages/home";
import { Routes, Route } from "react-router-dom";

const HomeRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default HomeRoute;
