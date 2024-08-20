import React, { useEffect } from "react";
import BeneficiaryDetailCard from "../components/Beneficiary";
import SenderProfile from "../components/Profile";
import DefaultBankDetailCard from "../components/BeneficaryBankCard";
import OrderCalculate from "../components/OrderCalculate";
import AddBeneficiaryModal from "../components/AddNewBeneficiaryModal";
import SendersList from "../components/SendersList";
import { setOrderCalculateDetail } from "../store/reducers/orders";
import { useDispatch } from "react-redux";

function Order(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOrderCalculateDetail(null));
  }, []);
  return (
    <div style={{ width: "100%" }}>

      <AddBeneficiaryModal />
      <SendersList />
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
