import React from "react";
import { List, Typography, Button, Divider } from "antd";
import { Link } from "react-router-dom";
import Order from "../pages/Order";
const jobData = [
  {
    name: "Kidus Yosef ",
  },
  {
    name: "Abel Tesfaye",
  },
  {
    name: "Abebe Kebede",
  },
];

const SendersItem = () => {
  return (
    <div
      bordered
      style={{
        margin: "25px 0",
        padding: "24px",
        backgroundColor: "#f5f5f5",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          Mohammed Fereja
        </Typography.Title>
        <Button type="primary">Add Beneficiary</Button>
      </div>
      <Divider />
      <List
        style={{ padding: "0 32px" }}
        dataSource={jobData}
        renderItem={(item) => (
          <List.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography.Link style={{ fontSize: "16px" }}>
                  {item.name}
                </Typography.Link>
              </div>
              <div
                style={{ textAlign: "right", fontSize: "14px", color: "#999" }}
              >
                <Link to="/order">
                  <Button size="small" type="primary">
                    Select
                  </Button>
                </Link>
              </div>
            </div>
          </List.Item>
        )}
      />
      <Divider />
    </div>
  );
};

export default SendersItem;
