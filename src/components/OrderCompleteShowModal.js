import React from "react";
import { Modal, Button, Typography, Row, Col, Divider } from "antd";
import {
  CheckCircleOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  setSendersForNext,
  setSender,
} from "../store/reducers/senders";
import { useSelector, useDispatch } from "react-redux";
import {
  getCreatedOrder,
  getIsPrintOrderModalOpen,
  resetState,
} from "../store/reducers/orders";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

const OrderDetailModal = () => {
  const navigate = useNavigate();
  const order = useSelector(getCreatedOrder);
  const dispatch = useDispatch();
  const isPrintOrderModalOpen = useSelector(getIsPrintOrderModalOpen);





  const goToHomePage = () => {
    dispatch(resetState());
    dispatch(setSender(null));
    navigate("/"); // Navigate to the home page
  };

  return (
    <>
      <Modal
        visible={isPrintOrderModalOpen}
        // onCancel={handleCancel}
        footer={null}
        centered
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CheckCircleOutlined
              style={{ fontSize: "36px", color: "#52c41a" }}
            />
            <Title level={3} style={{ margin: "0 0 0 10px", color: "#52c41a" }}>
              Order Completed
            </Title>
          </div>
        }
      >
        <Divider style={{ margin: "12px 0" }} />

        {order && (
          <div style={{ padding: "0 10px" }}>
            <Title level={4} style={{ margin: "5% 0 0 0", color: "#231e61" }}>
              Sender Details
            </Title>
            <Divider style={{ margin: "0 0 8px 0" }} />
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  First Name:
                </Text>
                <div>
                  <Text>{order.sender.first_name}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  Last Name:
                </Text>
                <div>
                  <Text>{order.sender.last_name}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  Phone Number:
                </Text>
                <div>
                  <Text>{order.sender.phone_number}</Text>
                </div>
              </Col>
            </Row>

            <Divider style={{ margin: "8px 0" }} />

            <Title level={4} style={{ marginBottom: 0, color: "#231e61" }}>
              Beneficiary Details
            </Title>
            <Divider style={{ margin: "0 0 8px 0" }} />
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  First Name:
                </Text>
                <div>
                  <Text>{order.receiver.first_name}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  Last Name:
                </Text>
                <div>
                  <Text>{order.receiver.last_name}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  Bank Name:
                </Text>
                <div>
                  <Text>{order.receiver.default_bank.bank}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  Account Number:
                </Text>
                <div>
                  <Text>{order.receiver.default_bank.account}</Text>
                </div>
              </Col>
            </Row>

            <Divider style={{ margin: "8px 0" }} />

            <Title level={4} style={{ marginBottom: 0, color: "#231e61" }}>
              Order Details
            </Title>
            <Divider style={{ margin: "0 0 8px 0" }} />
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  Fee:
                </Text>
                <div>
                  <Text>${order.commission.toFixed(2)}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  Amount in USD:
                </Text>
                <div>
                  <Text>${order.sent_usd.toFixed(2)}</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  Amount in Birr:
                </Text>
                <div>
                  <Text>{order.total_birr.toFixed(2)} ETB</Text>
                </div>
              </Col>
              <Col span={12}>
                <Text strong style={{ color: "#595959" }}>
                  Exchange Rate:
                </Text>
                <div>
                  <Text>{order.rate.toFixed(4)} ETB/USD</Text>
                </div>
              </Col>
            </Row>

            <Divider style={{ margin: "20px 0" }} />

            <Row
              style={{
                marginBottom: "10px",
              }}
              justify="space-between"
            >
              <Col style={{ textAlign: "center" }}>
                <Button
                  type="link"
                  icon={<HomeOutlined style={{ color: "#231e61" }} />}
                  onClick={goToHomePage}
                  style={{
                    color: "#231e61",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Button>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <Button
                  type="link"
                  icon={<PlusOutlined style={{ color: "#231e61" }} />}
                  onClick={() => {
                    console.log("Next Order clicked");
                    dispatch(resetState());
                    dispatch(setSendersForNext());
                  }}
                  style={{
                    color: "#231e61",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Next Order
                </Button>
              </Col>
              {/* <Col style={{ textAlign: "center" }}>
                <Receipt order={order} />
              </Col> */}
            </Row>
          </div>
        )}
      </Modal>
    </>
  );
};

export default OrderDetailModal;
