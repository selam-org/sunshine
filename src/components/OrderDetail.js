import React, { useState } from "react";
import { Modal, Button, Typography, Row, Col, Divider } from "antd";
import { getBeneficiary, getSender } from "../store/reducers/senders";
import { useSelector, useDispatch } from "react-redux";
import {
  getCalculateDetail,
  createOrderApiCall,
  getCreateOrderError,
  getCreateOrderLoading,
  getIsCreateOrderModalOpen,
  setIsCreateOrderModalOpen,
} from "../store/reducers/orders";
import OrderCompletionModal from "./OrderCompleteShowModal";
const { Text, Title } = Typography;

const OrderDetailModal = (props) => {
  const { disabled } = props;
  const dispatch = useDispatch();
  const loading = useSelector(getCreateOrderLoading);
  const error = useSelector(getCreateOrderError);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const sender = useSelector(getSender);
  const beneficiary = useSelector(getBeneficiary);
  const calculateDetail = useSelector(getCalculateDetail);
  const isCreateOrderModalOpen = useSelector(getIsCreateOrderModalOpen);
  const showModal = () => {
    dispatch(setIsCreateOrderModalOpen({ open: true }));
  };

  const handleCancel = () => {
    dispatch(setIsCreateOrderModalOpen({ open: false }));
  };

  if (
    !sender ||
    !calculateDetail ||
    !beneficiary ||
    !beneficiary.default_bank
  ) {
    dispatch(setIsCreateOrderModalOpen({ open: false }));
  }
  const handleCreateOrder = () => {
    if (
      !sender ||
      !calculateDetail ||
      !beneficiary ||
      !beneficiary.default_bank
    ) {
      return;
    }
    dispatch(
      createOrderApiCall({
        receiver_id: beneficiary.id,
        sender_id: sender.id,
        sent_usd: calculateDetail.sent_usd,
        receiver_bank_id: beneficiary.default_bank.id,
      })
    );
  };

  return (
    <>
      <Button
        disabled={
          !(
            sender &&
            beneficiary &&
            beneficiary.default_bank &&
            calculateDetail
          )
        }
        // disabled={disabled}
        // disabled={true}
        onClick={showModal}
        type="primary"
        block
        style={{
          backgroundColor: "#231e61", // Primary color
          borderColor: "#231e61",
          borderRadius: "8px",
          height: "40px",
          fontSize: "16px",
        }}
      >
        Proceed
      </Button>
      <Modal
        visible={isCreateOrderModalOpen}
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons
        centered
        title={
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Title level={3} style={{ margin: "0" }}>
              Order Details
            </Title>
          </div>
        }
      >
        <Divider
          style={{
            borderWidth: 2,
            margin: "0 0 4% 0",
          }}
        />
        <div>
          <OrderCompletionModal />
          <Title level={4} style={{ margin: "5% 0 0 0" }}>
            Sender Details
          </Title>
          <Divider style={{ margin: "0 0 8px 0" }} />

          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text>First Name:</Text>
              <div>
                <Text strong>{sender && sender.first_name}</Text>
              </div>
            </Col>
            <Col span={12}>
              <Text>Last Name:</Text>
              <div>
                <Text strong>{sender && sender.last_name}</Text>
              </div>
            </Col>
            <Col span={12}>
              <Text>Phone Number:</Text>
              <div>
                <Text strong>{sender && sender.phone_number}</Text>
              </div>
            </Col>
          </Row>

          <Divider style={{ margin: "8px 0" }} />

          <Title level={4} style={{ marginBottom: 0 }}>
            Beneficiary Details
          </Title>
          <Divider style={{ margin: "0 0 8px 0" }} />

          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text>First Name:</Text>
              <div>
                <Text strong>{beneficiary && beneficiary.first_name}</Text>
              </div>
            </Col>
            <Col span={12}>
              <Text>Last Name:</Text>
              <div>
                <Text strong>{beneficiary && beneficiary.last_name}</Text>
              </div>
            </Col>
            <Col span={12}>
              <Text>Bank Name:</Text>
              <div>
                <Text strong>
                  {beneficiary &&
                    beneficiary.default_bank &&
                    beneficiary.default_bank.bank}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <Text>Account Number:</Text>
              <div>
                <Text strong>
                  {beneficiary &&
                    beneficiary.default_bank &&
                    beneficiary.default_bank.account}
                </Text>
              </div>
            </Col>
          </Row>

          <Divider style={{ margin: "8px 0" }} />

          <Title level={4} style={{ marginBottom: 0 }}>
            Order Details
          </Title>
          <Divider style={{ margin: "0 0 8px 0" }} />

          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text>Fee:</Text>
              <div>
                <Text strong>
                  ${calculateDetail && calculateDetail.commission.toFixed(2)}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <Text>Amount in USD:</Text>
              <div>
                <Text strong>
                  ${calculateDetail && calculateDetail.sent_usd.toFixed(2)}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <Text>Amount in Birr:</Text>
              <div>
                <Text strong>
                  {calculateDetail &&
                    calculateDetail &&
                    calculateDetail.total_birr.toFixed(2)}{" "}
                  ETB
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <Text>Exchange Rate:</Text>
              <div>
                <Text strong>
                  {calculateDetail && calculateDetail.rate.toFixed(4)} ETB/USD
                </Text>
              </div>
            </Col>
          </Row>

          <Divider style={{ margin: "8px 0" }} />

          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#FF6600",
                }}
              >
                Total:
              </Text>
              <div>
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#FF6600",
                  }}
                >
                  ${calculateDetail && calculateDetail.total_usd.toFixed(2)}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#FF6600",
                }}
              >
                Total in Birr:
              </Text>
              <div>
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#FF6600",
                  }}
                >
                  {calculateDetail && calculateDetail.total_birr.toFixed(2)} ETB
                </Text>
              </div>
            </Col>
          </Row>

          <Divider style={{ margin: "8px 0" }} />

          <Button
            type="primary"
            loading={loading}
            disabled={loading}
            onClick={handleCreateOrder}
            style={{
              backgroundColor: "#90EE90",
              borderColor: "#90EE90",
              color: "#000",
              width: "100%",
              margin: "4% 0",
              height: "40px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Complete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default OrderDetailModal;
