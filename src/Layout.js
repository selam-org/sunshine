import React, { useState } from "react";
import Menu from "./components/Menu";
import SearchCustomer from "./pages/SearchCustomer";
import { Route, Routes } from "react-router-dom";
import Order from "./pages/Order";
const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
      }}
    >
      <Menu />
      <div
        style={{
          width: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<SearchCustomer />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
