import React, { useState } from "react";
import { Button, Input, Select, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import SenderTaps from "../components/Taps";
import SenderList from "../components/SendersList";
import {
  isSendersDialogOpen,
  setSenderIsDialog,
  getSendersApi,
  getSenders,
} from "../store/reducers/senders";
const { Option } = Select;
const { Text } = Typography;

const CustomerSenderComponent = () => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(isSendersDialogOpen);
  const senders = useSelector(getSenders);
  const validateUSPhoneNumber = (phoneNumber) => {
    // Regular expression to match exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;

    // Test the phoneNumber against the regex
    return phoneRegex.test(phoneNumber);
  };
  const handleSearch = () => {
    if (!isPhoneValid) {
      return;
    }
    dispatch(getSendersApi());
    console.log("Enter key pressed with phone number:", phone);
    console.log("dialog 2: ", isDialogOpen);
  };
  const handleKeyPress = (e) => {
    console.log("dialog: ", isDialogOpen);
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handlePhoneInputChange = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    setPhone(value);

    if (validateUSPhoneNumber(value)) {
      console.log("Valid US phone number");
      setIsPhoneValid(true);
    } else {
      console.log("Invalid phone number");
      setIsPhoneValid(false);
      dispatch(setSenderIsDialog({ open: false }));
    }
  };

  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        padding: "16px",
        borderRadius: "5px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          marginBottom: "16px",
          borderBottom: "1px solid #e8e8e8",
          paddingBottom: "8px",
        }}
      >
        <Text strong>Customer / Sender</Text>
      </div>

      {/* Tabs for Different Options */}
      <SenderTaps />

      {/* Telephone Input Section */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <Select defaultValue="US +1" style={{ width: 100, marginRight: "8px" }}>
          <Option value="US +1">US +1</Option>
          <Option value="ET +251">ET +251</Option>
          {/* Add more options as needed */}
        </Select>

        <Input
          onChange={handlePhoneInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Telephone"
          style={{ flex: 1 }}
        />
      </div>

      {/* New Customer and Search Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a href="#">New Customer</a>

        <SenderList isDisabled={!isPhoneValid} onClick={handleSearch} />
      </div>
    </div>
  );
};

export default CustomerSenderComponent;
