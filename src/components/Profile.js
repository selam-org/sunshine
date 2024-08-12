import React from "react";
import { Card, Typography, Row, Col, Divider , Button} from "antd";
import { EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const senderData = {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+1 (123) 456-7890",
};

const SenderDetailCard = () => {
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: "10px",
        border: "1px solid #d9d9d9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        padding: "0", // Remove padding from the card itself
        overflow: "hidden",
        marginTop : "1%",
    
      }}
      bordered={false}
    >
      <div
        style={{
           borderBottom: "1px solid #d9d9d9",
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Title level={4} style={{ margin: 0,  }}>
          Customer / Sender
        </Title>
        <Button
          type="text"
          icon={<EditOutlined />}
          style={{ marginRight: '24px' }}
        >edit</Button>
      </div>
      <Divider style={{ margin: 0 }} />
      <div style={{ padding: "5px " }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>First Name:</Text>
            <div style={{ paddingTop: "8px" }}>
              <Text>{senderData.firstName}</Text>
            </div>
          </Col>
          <Col span={8}>
            <Text strong>Last Name:</Text>
            <div style={{ paddingTop: "8px" }}>
              <Text>{senderData.lastName}</Text>
            </div>
          </Col>
          <Col span={8}>
            <Text strong>Phone Number:</Text>
            <div style={{ paddingTop: "8px" }}>
              <Text>{senderData.phoneNumber}</Text>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default SenderDetailCard;
