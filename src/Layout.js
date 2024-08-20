import React from "react";
import NavBar from "./components/NavBar"; // Updated import to NavBar
import SearchCustomer from "./pages/SearchCustomer";
import Order from "./pages/Order";
import SearchOrders from "./pages/SearchOrders";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content Area */}
      <div
        style={{
          padding: " 0", // Add padding to the content area
          margin: "1% 3% ",

        }}

      >
        <Routes>
          <Route path="/" element={<SearchCustomer />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orders" element={<SearchOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
