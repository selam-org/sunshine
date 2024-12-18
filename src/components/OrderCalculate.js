import React, { useState, useEffect } from "react";
import { Row, Col, Input, Select, Divider, Typography, Card } from "antd";
import OrderDetailModal from "./OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  getCalculateDetail,
  calculateOrderApiCall,
  getCalculateLoading,
} from "../store/reducers/orders";
const { Title, Text } = Typography;
const { Option } = Select;

const CurrencyConverter = () => {
  const [sendAmount, setSendAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [exchangeRate] = useState(134.0); // Example exchange rate
  const [charge, setCharge] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector(getCalculateLoading);
  const calculateDetail = useSelector(getCalculateDetail);
  useEffect(() => {
    if (calculateDetail) {
      setValues(calculateDetail);
    }
  }, [calculateDetail]);
  const calculateFromSendAmount = () => {
    dispatch(calculateOrderApiCall({ sent_usd: sendAmount }));
    console.log("calculatedReceiveAmount", calculateDetail);
  };
  const setValues = (value) => {
    setReceiveAmount(value.total_birr.toFixed(2));
    setCharge(value.commission.toFixed(2));
    setGrandTotal(value.total_usd.toFixed(2));
    setSendAmount(value.sent_usd.toFixed(2));
  };
  const calculateFromReceiveAmount = () => {
    dispatch(calculateOrderApiCall({ total_birr: receiveAmount }));
    console.log("calculatedReceiveAmount", calculateDetail);
  };

  const calculateFromGrandTotal = () => {
    dispatch(calculateOrderApiCall({ total_usd: grandTotal }));
    console.log("calculatedReceiveAmount", calculateDetail);
  };

  return (
    <Card
      style={{
        width: "100%",
        margin: "1% 0 0 0",
        borderRadius: "12px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col span={12}>
          <Text strong>Send Amount</Text>
          <Input
            disabled={loading}
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            onBlur={calculateFromSendAmount}
            placeholder="0.00"
            addonAfter={
              <Select defaultValue="USD">
                <Option value="USD">USD</Option>
                <Option value="ETB">ETB</Option>
                <Option value="EUR">EUR</Option>
              </Select>
            }
            style={{ marginTop: "8px", borderRadius: "8px" }}
          />
        </Col>
        <Col span={12}>
          <Text strong>Receive Amount</Text>
          <Input
            disabled={loading}
            value={receiveAmount}
            onChange={(e) => setReceiveAmount(e.target.value)}
            onBlur={calculateFromReceiveAmount}
            placeholder="0.00"
            addonAfter={
              <Select defaultValue="ETB">
                <Option value="USD">USD</Option>
                <Option value="ETB">ETB</Option>
                <Option value="EUR">EUR</Option>
              </Select>
            }
            style={{ marginTop: "8px", borderRadius: "8px" }}
          />
        </Col>
      </Row>

      <Divider style={{ margin: "12px 0" }} />

      <Row gutter={[16, 16]} align="middle">
        <Col span={12}>
          <Title
            level={5}
            style={{ color: "#FF6600", margin: 0, textAlign: "left" }}
          >
            Exchange Rate: {calculateDetail && calculateDetail.rate.toFixed(4)}
          </Title>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          {loading && (
            <Text strong style={{ color: "#FF6600" }}>
              Calculating...
            </Text>
          )}
        </Col>
      </Row>

      <Divider style={{ margin: "12px 0" }} />

      <Row gutter={[16, 16]} align="middle">
        <Col span={12}>
          <Text strong>Charge:</Text>
          <Text style={{ color: "#595959", paddingLeft: "8px" }}>
            {calculateDetail && calculateDetail.commission
              ? calculateDetail.commission
              : 0}
          </Text>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Text strong>Total:</Text>
          <Text style={{ color: "#595959", paddingLeft: "8px" }}>
            {calculateDetail && calculateDetail.sent_usd
              ? calculateDetail.sent_usd
              : 0}
          </Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]} align="middle" style={{ marginTop: "8px" }}>
        <Col span={12}>
          <Text strong style={{ fontSize: "18px", color: "#FF6600" }}>
            Receive Total:
          </Text>
          <Text
            strong
            style={{ fontSize: "18px", color: "#FF6600", paddingLeft: "8px" }}
          >
            {calculateDetail && calculateDetail.total_birr
              ? calculateDetail.total_birr
              : 0}
          </Text>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Text strong style={{ fontSize: "18px", color: "#FF6600" }}>
            Grand Total:
          </Text>
          <Text
            strong
            style={{ fontSize: "18px", color: "#FF6600", paddingLeft: "8px" }}
          >
            {calculateDetail && calculateDetail.total_usd
              ? calculateDetail.total_usd
              : 0}
          </Text>
        </Col>
      </Row>

      <Divider style={{ margin: "12px 0" }} />

      <Row gutter={[16, 16]} align="middle">
        <Col span={24}>
          <Input
            disabled={loading}
            loading={loading}
            value={grandTotal}
            onChange={(e) => setGrandTotal(e.target.value)}
            onBlur={calculateFromGrandTotal}
            placeholder="0.00"
            addonBefore={<Text strong>Grand Total</Text>}
            style={{ borderRadius: "8px", backgroundColor: "#f7f7f7" }}
          />
        </Col>
      </Row>

      <Divider style={{ margin: "12px 0" }} />

      <Row gutter={[16, 16]} align="middle">
        <Col span={12}>
          <Input
            disabled={loading}
            placeholder="0.00"
            addonBefore={<Text strong>Cash Received</Text>}
            style={{ borderRadius: "8px", backgroundColor: "#f7f7f7" }}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="0.00"
            addonBefore={<Text strong>Change</Text>}
            disabled
            style={{
              borderRadius: "8px",
              backgroundColor: "#f7f7f7",
            }}
          />
        </Col>
      </Row>

      <Divider style={{ margin: "12px 0" }} />

      <Row gutter={[16, 16]} align="middle">
        <Col span={24}>
          <OrderDetailModal disabled={loading} />
        </Col>
      </Row>
    </Card>
  );
};

export default CurrencyConverter;
