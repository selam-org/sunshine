import React from "react";
import { List, Typography, Button, Divider, Card } from "antd";
import { Link } from "react-router-dom";
import { UserAddOutlined, SelectOutlined } from "@ant-design/icons";
import AddBeneficiaryModal from "./AddNewBeneficiaryModal";
import { useDispatch } from "react-redux";
import {
  setSenderIsDialog,
  setAddBeneficiaryModal,
  setSender,
  setBeneficiary,
} from "../store/reducers/senders";
import { useNavigate } from "react-router-dom";

const SendersItem = (props) => {
  const { sender } = props;
  console.log("sender", sender);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  return (
    <Card
      style={{
        margin: "20px 0",
        backgroundColor: "#ffffff", // Clean white background for the card
        borderRadius: "12px",
        border: "1px solid #e0e0e0", // Light border color for subtle separation
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", // Slight shadow for depth
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px", // Internal padding for the content
          backgroundColor: "#f7f7f7", // Light background for header
          borderRadius: "12px 12px 0 0", // Rounded corners at the top
          marginBottom: "8px", // Adjusted spacing below header
        }}
      >
        <Typography.Title level={4} style={{ margin: 0, color: "#231e61" }}>
          {sender.first_name} {sender.last_name}
        </Typography.Title>
        <Link to= "/order">
        <Button
          icon={<UserAddOutlined />} // Icon added to the button
          type="text" // Text button style
          style={{
            color: "#d87dc2", // The icon and text inherit this color
            display: "flex",
            alignItems: "center",
            fontWeight: "500",
            backgroundColor: "transparent", // Ensure no background color
            border: "none", // Ensure no border
            boxShadow: "none", // Remove any potential box shadow
          }}
          onClick={() => {
            console.log("clicked 1");
            
            dispatch(setSender(sender));
            dispatch(setSenderIsDialog({ open: false }));
            dispatch(setAddBeneficiaryModal({ open: true }));
          }}
          // Custom hover and active styles
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#a32098"; // Darken color on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#d87dc2"; // Reset color after hover
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.color = "#801d74"; // Darker color on click
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.color = "#a32098"; // Lighter color after click
          }}
        >
          Add New Beneficiary
        </Button>
        </Link>
        <AddBeneficiaryModal id={sender.id} />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={sender.receivers ? sender.receivers : []}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "8px 16px", // Reduced padding within each list item
              borderBottom: "1px solid #f0f0f0", // Light separator between items
              marginBottom: "0", // Removed margin between items
            }}
          >
            <List.Item.Meta
              title={
                <Typography.Text style={{ color: "#231e61" }}>
                  {item.name}
                  {capitalizeFirstLetter(item.first_name)}{" "}
                  {capitalizeFirstLetter(item.last_name)}
                </Typography.Text>
              }
            />
            <div>
              <Link to="/order">
                <Button
                  icon={<SelectOutlined />} // Icon added to the "Select" button
                  onClick={() => {
                    dispatch(setSenderIsDialog({ open: false }));
                    dispatch(setBeneficiary(item));
                    dispatch(setSender(sender));
                    
                  }}
                  size="small"
                  style={{
                    backgroundColor: "#00acee",
                    borderColor: "#00acee",
                    color: "white",
                    borderRadius: "20px", // Rounded corners for a softer look
                    fontWeight: "500", // Slightly bold text for emphasis
                    padding: "0 12px", // Adjusted padding for a balanced look
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    transition: "all 0.3s ease", // Smooth transition on hover and click
                  }}
                  // Custom hover and active styles
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#009fd4"; // Slightly darken on hover
                    e.currentTarget.style.borderColor = "#009fd4"; // Adjust border color on hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#00acee"; // Reset background color after hover
                    e.currentTarget.style.borderColor = "#00acee"; // Reset border color after hover
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.boxShadow = "none"; // Remove shadow on click
                    e.currentTarget.style.transform = "scale(0.98)"; // Slightly shrink on click
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 6px rgba(0, 0, 0, 0.1)"; // Restore shadow after click
                    e.currentTarget.style.transform = "scale(1)"; // Restore size after click
                  }}
                >
                  Select
                </Button>
              </Link>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SendersItem;
