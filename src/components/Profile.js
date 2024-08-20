import React, { useEffect } from "react";
import { Card, Typography, Row, Col, Divider, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getSender,
  getSenders,
  setSenderIsDialog,
} from "../store/reducers/senders";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

// const senderData = {
//   firstName: "John",
//   lastName: "Doe",
//   phoneNumber: "+1 (123) 456-7890",
// };

const SenderDetailCard = () => {
  const navigate = useNavigate();
  const senderData = useSelector(getSender);
  const senders = useSelector(getSenders);

  useEffect(() => {
    if (!senderData || senders.length === 0) {
      navigate("/");
      setSenderIsDialog({ open: false });
    }
  }, [senders]);
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #f0f0f0",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fafafa",
        padding: "0",
        overflow: "hidden",
        marginTop: "0",
      }}
      bordered={false}
    >
      <div
        style={{
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // padding: "16px",
        }}
      >
        <Title
          level={4}
          style={{
            margin: 0,
            color: "#231e61",
            fontFamily: "Bebas Neue, sans-serif",
          }}
        >
          Customer / Sender
        </Title>
        <Button
          type="text"
          icon={<EditOutlined />}
          style={{ color: "#1890ff", fontWeight: "bold" }}
        >
          Edit
        </Button>
      </div>
      <Divider style={{ margin: 0 }} />
      <div style={{ padding: "6px" }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong style={{ color: "#231e61" }}>
              First Name:
            </Text>
            <div style={{ paddingTop: "8px" }}>
              <Text style={{ color: "#595959" }}>{senderData.first_name}</Text>
            </div>
          </Col>
          <Col span={8}>
            <Text strong style={{ color: "#231e61" }}>
              Last Name:
            </Text>
            <div style={{ paddingTop: "8px" }}>
              <Text style={{ color: "#595959" }}>{senderData.last_name}</Text>
            </div>
          </Col>
          <Col span={8}>
            <Text strong style={{ color: "#231e61" }}>
              Phone Number:
            </Text>
            <div style={{ paddingTop: "8px" }}>
              <Text style={{ color: "#595959" }}>
                {senderData.phone_number}
              </Text>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default SenderDetailCard;
