import React from 'react';
import { Card, Typography, Row, Col, Button, Select } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const bankDetails = [
  { id: 1, bankName: 'Bank of America', accountNumber: '1234567890' },
  { id: 2, bankName: 'Chase Bank', accountNumber: '0987654321' },
  { id: 3, bankName: 'Wells Fargo', accountNumber: '1122334455' }
];

const DefaultBankDetailCard = () => {
  const defaultBankDetail = bankDetails[0]; // Assuming the first one is the default

  return (
    <Card
      style={{
        width: '100%',
        margin: '1% 0 0 0', // Center the card with margin
        borderRadius: '10px',
        border: '1px solid #d9d9d9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
      }}
      bordered={false}
    >
      <Title level={4} style={{ marginBottom: '16px' }}>
        Beneficiary's Bank Detail
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Text strong>Bank Name:</Text>
          <div style={{ paddingTop: '8px' }}>
            <Text>{defaultBankDetail.bankName}</Text>
          </div>
        </Col>
        <Col span={12}>
          <Text strong>Account Number:</Text>
          <div style={{ paddingTop: '8px' }}>
            <Text>{defaultBankDetail.accountNumber}</Text>
          </div>
        </Col>
      </Row>
      <div style={{ marginTop: '24px' }}>
        <Select
          placeholder="Choose a bank detail"
          style={{ width: '100%', marginBottom: '16px' }}
        >
          {bankDetails.map(detail => (
            <Option key={detail.id} value={detail.id}>
              {detail.bankName} - {detail.accountNumber}
            </Option>
          ))}
        </Select>
        <Button type="primary" block>
          Add New Bank Detail
        </Button>
      </div>
    </Card>
  );
};

export default DefaultBankDetailCard;
