import React from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Select,
  Divider,
  Typography,
  Card,
} from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const CurrencyConverter = () => {
  return (
    <Card
      style={{
        width: "100%", // Set the width to 40% of the screen
        margin: "1% auto", // Center the card with margin
        padding: "0px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutter={[6, 6]}>
        <Col span={10}>
          <Text>Send Amount</Text>
          <Input
            placeholder="0.00"
            addonAfter={
              <Select disabled defaultValue="USD">
                <Option value="USD">USD</Option>
                <Option value="ETB">ETB</Option>
                <Option value="EUR">EUR</Option>
              </Select>
            }
          />
        </Col>
        <Col span={10}>
          <Text>Receive Amount</Text>
          <Input
            placeholder="0.00"
            addonAfter={
              <Select disabled defaultValue="ETB">
                <Option value="USD">USD</Option>
                <Option value="ETB">ETB</Option>
                <Option value="EUR">EUR</Option>
              </Select>
            }
          />
        </Col>
      </Row>

      <Divider />

      <Row gutter={[6, 6]} align="middle">
        <Col span={8}>
          <Title level={5} style={{ color: "#FF6600" }}>
            Rate: 118.0000
          </Title>
        </Col>
      </Row>

      <Row gutter={[16, 16]} align="middle">
        <Col span={12}>
          <Text>0.00 Send Amount</Text>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Text style={{ color: "#FF6600" }}>Send Amount</Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]} align="middle">
        <Col span={12}>
          <Text>0.00 Charge</Text>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Text style={{ color: "#FF6600" }}>Charge</Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]} align="middle">
        <Col span={12}>
          <Text>0.00 Surcharge</Text>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Text style={{ color: "#FF6600" }}>Surcharge</Text>
        </Col>
      </Row>

      

      <Divider />

      <Row gutter={[16, 16]} align="middle">
        <Col span={12}>
          <Input
            placeholder="0.00"
            addonBefore={<Text strong>Grand Total</Text>}
          />
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]} align="middle">
        <Col span={12}>
          <Text>Cash</Text>
          <Input placeholder="0.00" />
        </Col>
        <Col span={12}>
          <Text>Change</Text>
          <Input placeholder="0.00" disabled />
        </Col>
      </Row>
      <Row gutter={[16, 16]} align="middle">
        <Col span={24}>
          <Button
            style={{ margin:"3% 0",  width: "100%", backgroundColor: "#90EE90" }}
            type="text"
          >
            Send
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CurrencyConverter;
