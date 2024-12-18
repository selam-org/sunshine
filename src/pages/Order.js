import React, { useEffect } from "react";
import BeneficiaryDetailCard from "../components/Beneficiary";
import SenderProfile from "../components/Profile";
import DefaultBankDetailCard from "../components/BeneficaryBankCard";
import OrderCalculate from "../components/OrderCalculate";
import AddBeneficiaryModal from "../components/AddNewBeneficiaryModal";
import SendersList from "../components/SendersList";
import { setOrderCalculateDetail } from "../store/reducers/orders";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../store/reducers/senders";
import { useNavigate } from "react-router-dom";
function Order() {
  const navigate = useNavigate();
  const sender = useSelector(getSender);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!sender) {
      navigate("/");
    }
    dispatch(setOrderCalculateDetail(null));
  }, []);
  useEffect(() => {
    if (!sender) {
      navigate("/");
    }
  }, [sender]);
  if (!sender) {
    navigate("/");
  }
  return (
    <div style={{ width: "100%" }}>
      {sender ? (
        <>
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
        </>
      ) : (
        navigate("/")
      )}
    </div>
  );
}

export default Order;
