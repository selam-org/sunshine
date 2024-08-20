import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col, Select, Divider } from "antd";
import AddBankAccountModal from "./AddBankDetail";
import { getBeneficiary, setDefaultBank } from "../store/reducers/senders";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;
const { Option } = Select;

const DefaultBankDetailCard = () => {
  const dispatch = useDispatch();
  const beneficiaryData = useSelector(getBeneficiary);
  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    if (beneficiaryData?.default_bank) {
      setSelectedBank(beneficiaryData.default_bank.id);
    }
  }, [beneficiaryData]); // Update selectedBank when beneficiaryData changes

  const handleBankChange = (value) => {
    setSelectedBank(value);
    console.log("Selected Bank:", value);
    if (!beneficiaryData) {
      return;
    }
    const bank = beneficiaryData.accounts.find((bank) => bank.bank === value);
    if (!bank) {
      return;
    }
    console.log("Selected Bank:", bank);
    dispatch(setDefaultBank(bank));
  };

  return (
    <Card
      style={{
        width: "100%",
        margin: "1% 0 0 0",
        borderRadius: "12px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
      }}
    >
      <Title
        level={4}
        style={{ color: "#231e61", fontFamily: "Bebas Neue, sans-serif" }}
      >
        Beneficiary's Bank Detail
      </Title>
      <Divider style={{ margin: "12px 0" }} />
      {beneficiaryData && beneficiaryData.default_bank ? (
        <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
          <Col span={12}>
            <Text strong style={{ color: "#231e61" }}>
              Bank Name:
            </Text>
            <div style={{ paddingTop: "8px" }}>
              <Text style={{ color: "#595959" }}>
                {beneficiaryData.default_bank.bank}
              </Text>
            </div>
          </Col>
          <Col span={12}>
            <Text strong style={{ color: "#231e61" }}>
              Account Number:
            </Text>
            <div style={{ paddingTop: "8px" }}>
              <Text style={{ color: "#595959" }}>
                {beneficiaryData.default_bank.account}
              </Text>
            </div>
          </Col>
        </Row>
      ) : (
        <div style={{ textAlign: "left", marginBottom: "24px" }}>
          <Text strong style={{ color: "#231e61" }}>
            No Bank Detail Found
          </Text>
        </div>
      )}

      <Select
        placeholder="Choose a bank detail"
        value={
          beneficiaryData && beneficiaryData.default_bank
            ? `${beneficiaryData.default_bank.bank} - ${beneficiaryData.default_bank.account}`
            : null
        } // Bind selected value to state
        onChange={handleBankChange} // Update state on change
        disabled={!beneficiaryData} // Disable if beneficiaryData is null or undefined
        style={{
          width: "100%",
          borderRadius: "8px",
          borderColor: "#e0e0e0",
          backgroundColor: "#f7f7f7",
          marginBottom: "24px",
          color: "#595959",
        }}
        dropdownStyle={{ borderRadius: "8px" }}
      >
        {beneficiaryData &&
          beneficiaryData.accounts.map((detail) => (
            <Option
              onClick={() => {
                console.log("clicked");
              }}
              key={detail.bank}
              value={detail.bank}
            >
              {detail.bank} - {detail.account}
            </Option>
          ))}
      </Select>
      <div>
        <AddBankAccountModal disabled={!beneficiaryData} />{" "}
        {/* Disable if beneficiaryData is null or undefined */}
      </div>
    </Card>
  );
};

export default DefaultBankDetailCard;
