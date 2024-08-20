import React, { useState } from "react";
import { Card, Typography } from "antd";
import OrderFilter from "../components/OrdersFilter";
import ListOfOrders from "../components/ListOfOrders";
import moment from "moment";

// Sample data to be displayed in the OrdersTable
const sampleData = [
  {
    key: "1",
    sender: "John Doe",
    receiver: "Amanuel Tadesse",
    totalUSD: 500,
    totalBirr: 27000,
    fee: 10,
    grandTotal: 510,
    rate: 54.0,
    date: "2024-08-15",
  },
  {
    key: "2",
    sender: "Jane Smith",
    receiver: "Belen Wondimu",
    totalUSD: 300,
    totalBirr: 16200,
    fee: 8,
    grandTotal: 308,
    rate: 54.0,
    date: "2024-08-14",
  },
  {
    key: "3",
    sender: "Alex Johnson",
    receiver: "Dawit Bekele",
    totalUSD: 150,
    totalBirr: 8100,
    fee: 5,
    grandTotal: 155,
    rate: 54.0,
    date: "2024-08-13",
  },
  {
    key: "4",
    sender: "Emily Davis",
    receiver: "Tigist Alemayehu",
    totalUSD: 200,
    totalBirr: 10800,
    fee: 6,
    grandTotal: 206,
    rate: 54.0,
    date: "2024-08-12",
  },
  {
    key: "5",
    sender: "Michael Brown",
    receiver: "Melat Eshetu",
    totalUSD: 250,
    totalBirr: 13500,
    fee: 7,
    grandTotal: 257,
    rate: 54.0,
    date: "2024-08-11",
  },
];

const OrdersPage = () => {
  const [filteredData, setFilteredData] = useState(sampleData);

  const handleFilter = (filterValues) => {
    // Implement your filtering logic here based on filterValues
    const { senderFirstName, senderLastName, beneficiaryFirstName, beneficiaryLastName, senderPhone, dateRange, status } = filterValues;

    let data = sampleData;

    if (senderFirstName) {
      data = data.filter((order) =>
        order.sender.toLowerCase().includes(senderFirstName.toLowerCase())
      );
    }
    if (senderLastName) {
      data = data.filter((order) =>
        order.sender.toLowerCase().includes(senderLastName.toLowerCase())
      );
    }
    if (beneficiaryFirstName) {
      data = data.filter((order) =>
        order.receiver.toLowerCase().includes(beneficiaryFirstName.toLowerCase())
      );
    }
    if (beneficiaryLastName) {
      data = data.filter((order) =>
        order.receiver.toLowerCase().includes(beneficiaryLastName.toLowerCase())
      );
    }
    if (senderPhone) {
      data = data.filter((order) =>
        order.senderPhone?.includes(senderPhone)
      );
    }
    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      data = data.filter((order) => {
        const orderDate = moment(order.date);
        return orderDate.isBetween(startDate, endDate, "day", "[]");
      });
    }
    if (status) {
      data = data.filter((order) => order.status === status);
    }

    setFilteredData(data);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card
        title={
          <Typography.Title level={4} style={{ marginBottom: 0, color: "#231e61" }}>
            Orders Management
          </Typography.Title>
        }
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <OrderFilter
          onFinish={handleFilter} // Pass the filtering function to the OrderFilter
        />
        <ListOfOrders data={filteredData} loading={false} />
      </Card>
    </div>
  );
};

export default OrdersPage;
