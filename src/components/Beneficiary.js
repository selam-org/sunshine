import React from "react";
import { Card, Typography, Row, Col, Divider, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getBeneficiary,
  setAddBeneficiaryModal,
  setUpdateBeneficiaryModal,
  setSenderIsDialog,
} from "../store/reducers/senders";
import UpdateBeneficiaryModal from "./UpdateBeneficiaryModal";

const { Title, Text } = Typography;

const BeneficiaryDetailCard = () => {
  const beneficiaryData = useSelector(getBeneficiary);
  const dispatch = useDispatch();

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
        marginTop: "1%",
      }}
      bordered={false}
    >
      <div
        style={{
          padding: "6px",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          Beneficiary
        </Title>
        <div style={{ display: "flex", gap: "6px" }}>
          <Button
            onClick={() => {
              dispatch(setSenderIsDialog({ open: true }));
            }}
            type="text"
            style={{ color: "#1890ff", fontWeight: "bold" }}
          >
            List Beneficiary
          </Button>
          <Button
            onClick={() => {
              console.log("clicked");
              dispatch(setAddBeneficiaryModal({ open: true }));
            }}
            type="text"
            style={{ color: "#1890ff", fontWeight: "bold" }}
          >
            Add New Beneficiary
          </Button>
          <Button
            type="text"
            disabled={!beneficiaryData}
            onClick={() => {
              dispatch(setUpdateBeneficiaryModal({ open: true }));
            }}
            icon={<EditOutlined />}
            style={{ color: "#1890ff", fontWeight: "bold" }}
          >
            Edit
          </Button>
        </div>
      </div>
      <Divider style={{ margin: 0 }} />
      <div style={{ padding: "6px" }}>
        {beneficiaryData ? (
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Text strong style={{ color: "#595959" }}>
                First Name:
              </Text>
              <div style={{ paddingTop: "8px" }}>
                <Text style={{ color: "#000" }}>
                  {beneficiaryData.first_name}
                </Text>
              </div>
            </Col>
            <Col span={8}>
              <Text strong style={{ color: "#595959" }}>
                Last Name:
              </Text>
              <div style={{ paddingTop: "8px" }}>
                <Text style={{ color: "#000" }}>
                  {beneficiaryData.last_name}
                </Text>
              </div>
            </Col>
            <Col span={8}>
              <Text strong style={{ color: "#595959" }}>
                Phone Number:
              </Text>
              <div style={{ paddingTop: "8px" }}>
                <Text style={{ color: "#000" }}>
                  {beneficiaryData.phone_number}
                </Text>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <div>
              <Text style={{ color: "#000" }}>No Beneficiary Found </Text>
            </div>
          </>
        )}
      </div>
      <UpdateBeneficiaryModal />
    </Card>
  );
};

export default BeneficiaryDetailCard;
