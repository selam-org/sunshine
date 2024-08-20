import React, { useState , useEffect} from "react";
import { Button, Input, Select, Typography, Space, Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import SenderTaps from "../components/Taps";
import SenderList from "../components/SendersList";
import AddSenderModal from "../components/AddSenderModal";
import {
  isSendersDialogOpen,
  setSenderIsDialog,
  getSendersApi,
  getSenders,
  setBeneficiary,
} from "../store/reducers/senders";

import { setOrderCalculateDetail } from "../store/reducers/orders";
const { Option } = Select;
const { Text } = Typography;

const CustomerSenderComponent = () => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(isSendersDialogOpen);
  const senders = useSelector(getSenders);

  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const validateUSPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/; // Regular expression to match exactly 10 digits
    return phoneRegex.test(phoneNumber);
  };

  useEffect(() => {
    dispatch(setBeneficiary(null));
    dispatch(setOrderCalculateDetail(null));
    console.log("senders");
  }, []);
  const handleSearch = () => {
    if (!isPhoneValid) {
      return;
    }
    dispatch(getSendersApi({ phone_number: phone }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePhoneInputChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    if (validateUSPhoneNumber(value)) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
      dispatch(setSenderIsDialog({ open: false }));
    }
  };

  return (
    <Card
      style={{
        margin: "0 auto",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ textAlign: "left", marginBottom: "24px" }}>
        <Text
          strong
          style={{
            fontSize: "24px",
            color: "#231e61",
            fontFamily: "Bebas Neue, sans-serif",
          }}
        >
          Customer / Sender
        </Text>
      </div>

      {/* Tabs for Different Options */}
      <SenderTaps />

      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", marginTop: "24px" }}
      >
        {/* Telephone Input Section */}
        <Row gutter={16}>
          <Col span={8}>
            <Select
              defaultValue="US +1"
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                borderColor: "#d9d9d9",
                height: "40px",
              }}
            >
              <Option value="US +1">US +1</Option>
              <Option value="ET +251">ET +251</Option>
            </Select>
          </Col>
          <Col span={16}>
            <Input
              onChange={handlePhoneInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Telephone"
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                borderColor: isPhoneValid ? "#52c41a" : "#ff4d4f",
                height: "40px",
              }}
            />
          </Col>
        </Row>

        {/* New Customer and Search Button */}
        <Row gutter={16} justify="space-between">
          <Col>
            <AddSenderModal />
          </Col>
          <Col>

            <SenderList />


            <Button
              disabled={!isPhoneValid}
              onClick={handleSearch}
              type="primary"
              style={{
                backgroundColor: isPhoneValid ? "#52c41a" : "#d9d9d9",
                borderColor: isPhoneValid ? "#52c41a" : "#d9d9d9",
                borderRadius: "8px",
                fontWeight: "500",
                padding: "0 24px",
                height: "40px",
                width: "100%",
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default CustomerSenderComponent;
