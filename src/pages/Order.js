import React from "react";
import BeneficiaryDetailCard from "../components/Beneficiary";
import SenderProfile from "../components/Profile";
import DefaultBankDetailCard from "../components/BeneficaryBankCard";
import OrderCalculate from "../components/OrderCalculate";
function Order(props) {
  return (
    <div
      style={{
        margin: "0 3% ",
      }}
    >
      <SenderProfile />
      <BeneficiaryDetailCard />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "1%",
        }}
      >
        <DefaultBankDetailCard />
        <OrderCalculate />
      </div>
    </div>
  );
}

export default Order;
