import React, { useState } from "react";
import {
  Modal,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Select,
  message,
} from "antd";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  resetState,
  getDetailOrderModalVisible,
  setDetailOrderModalVisible,
  updateOrderApiCall,
  deleteOrderApiCall,
  getUpdateOrderError,
  getDeleteOrderError,
  getDeleteOrderLoading,
  getUpdateOrderLoading,
} from "../store/reducers/orders";
import Receipt from "./Receipt";

const { Text, Title } = Typography;
const { Option } = Select;

const OrderDetailModal = (props) => {
  function isToday(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  const { order } = props;
  const showModal = useSelector((state) =>
    getDetailOrderModalVisible(state, order?.id)
  );
  const updateOrderError = useSelector(getUpdateOrderError);
  const deleteOrderError = useSelector(getDeleteOrderError);
  const deleteOrderLoading = useSelector(getDeleteOrderLoading);
  const updateOrderLoading = useSelector(getUpdateOrderLoading);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedBank, setSelectedBank] = useState(order?.bank.id);
  const [orderPriority, setOrderPriority] = useState(order?.priority);

  const handleBankChange = (value) => {
    setSelectedBank(value);
  };

  const handlePriorityChange = (value) => {
    setOrderPriority(value);
  };

  const handleUpdateBank = () => {
    const updatedOrder = {
      receiver_bank_id: selectedBank,
      priority: orderPriority,
    };

    dispatch(updateOrderApiCall(updatedOrder, order?.id));
    console.log(updatedOrder);
  };

  const handleDeleteOrder = () => {
    // Dispatch the delete order action here
    message.success("Order deleted successfully!");
    dispatch(resetState());
  };

  return (
    <>
      <a
        onClick={() => {
          //   setShow(true);
          dispatch(setDetailOrderModalVisible({ id: order?.id, open: true }));
        }}
      >
        Detail
      </a>
      <Modal
        visible={showModal}
        footer={null}
        centered
        width={1000} // Set the width of the modal
        title={
          <div
            style={{
              // display: "flex",
              alignItems: "center",
              //   justifyContent: "center",
              width: "100%",
              //   textAlign: "center",
            }}
          >
            <Title level={3} style={{ margin: "0 0 0 10px", color: "#52c41a" }}>
              Order Details
            </Title>
          </div>
        }
        onCancel={() =>
          dispatch(setDetailOrderModalVisible({ id: order?.id, open: false }))
        }
      >
        <Divider style={{ margin: "12px 0" }} />

        {order && (
          <div
            style={{
              //   backgroundColor: "orange",
              padding: "0px",
              width: "100%",
            }}
          >
            <Row
              justify="space-between"
              style={{ margin: "0", width: "100%", padding: "10px" }}
              gutter={24}
            >
              {/* Left Column - Order and Beneficiary Details */}
              <Col span={10}>
                <Title level={4} style={{ marginBottom: 0, color: "#231e61" }}>
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
              </Col>

              {/* Vertical Divider */}
              <Col
                style={{
                  //   backgroundColor: "orange",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                span={3}
              >
                <Divider
                  type="vertical"
                  style={{
                    height: "80%",
                    width: "1px",
                    // backgroundColor: "#e0e0e0",
                    margin: "40px 0",
                    borderRadius: "4px",
                  }}
                  // style={{ margin÷:"30px 0",  height: "50%", border: "1px solid #595959" }}
                />
              </Col>
              {/* Right Column - Options */}
              <Col span={10}>
                <Title level={4} style={{ marginBottom: 0, color: "#231e61" }}>
                  Assigned Agent
                </Title>
                <Divider style={{ margin: "0 0 8px 0" }} />
                <Row gutter={[16, 8]}>
                  <Col span={24}>
                    <Text strong style={{ color: "#595959" }}>
                      {order.assigned_to
                        ? `${order.assigned_to.first_name} ${order.assigned_to.last_name}`
                        : "Unassigned"}
                    </Text>
                  </Col>
                </Row>

                {/* <Divider style={{ margin: "8px 0" }} /> */}

                <Title level={4} style={{ marginBottom: 0, color: "#231e61" }}>
                  Beneficiary Bank
                </Title>
                <Divider style={{ margin: "0 0 17px 0" }} />
                <Row gutter={[16, 8]}>
                  <Col span={24}>
                    <Select
                      value={selectedBank}
                      onChange={handleBankChange}
                      style={{ width: "100%" }}
                    >
                      {order.receiver.accounts.map((account) => (
                        <Option key={account.id} value={account.id}>
                          {`${account.bank} - ${account.account}`}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Row>

                {/* <Divider style={{ margin: "8px 0" }} /> */}

                <Title level={4} style={{ marginBottom: 0, color: "#231e61" }}>
                  Order Priority
                </Title>
                <Divider style={{ margin: "0 0 17px 0" }} />
                <Row gutter={[16, 8]}>
                  <Col span={24}>
                    <Select
                      value={orderPriority}
                      onChange={handlePriorityChange}
                      style={{ width: "100%" }}
                    >
                      <Option value="regular">Regular</Option>
                      <Option value="urgent">Urgent</Option>
                      <Option value="top_urgent">Top Urgent</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Divider style={{ margin: "20px 0" }} />

            <Row
              style={{
                // backgroundColor: "yellow",
                padding: "10px",
              }}
              justify="space-between"
            >
              <Col span={12}>
                {isToday(parseInt(order.created_at)) && (
                  <Button
                    type="link"
                    loading={deleteOrderLoading}
                    disabled={updateOrderLoading || deleteOrderLoading}
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      dispatch(deleteOrderApiCall(order.id));
                    }}
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Delete Order
                  </Button>
                )}
              </Col>
              <Col>
                <Receipt order={order} />
              </Col>
              <Col>
                {isToday(parseInt(order.created_at)) && (
                  <Button
                    loading={updateOrderLoading}
                    disabled={updateOrderLoading || deleteOrderLoading}
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleUpdateBank}
                    style={{
                      backgroundColor: "#231e61",
                      borderColor: "#231e61",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Update
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </>
  );
};

export default OrderDetailModal;
