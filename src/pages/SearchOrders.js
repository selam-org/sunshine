import React from "react";
import { Card, Typography, Tabs, Button } from "antd";
import OrderFilter from "../components/OrdersFilter";
import ListOfOrders from "../components/ListOfOrders";
import moment from "moment";
import SummaryReport from "../components/SummaryReport";

import * as XLSX from "xlsx";
import { getOrders } from "../store/reducers/orders";
import { useSelector } from "react-redux";

// Sample data to be displayed in the OrdersTable
const { TabPane } = Tabs;

const OrdersPage = () => {
  const orders = useSelector(getOrders);
  const handleExport = () => {
    // Format the orders data for export
    const formattedData = orders.map((order) => ({
      Invoice: "SE001-3",
      "Confirmation No": "524475046535",
      Agency: "SE001",
      Date: moment().format("MM/DD/YYYY h:mm:ss A"),
      "Send Currency": "Dollar",
      "Received Currency": "Ethiopian Birr",
      "Rate Change Receiver": order.rate || 0.0,
      "Net Amount Receiver": order.total_birr || 0.0,
      Fee: order.commission || 0.0,
      Total: order.total_usd || 0.0,
      "Payment Type": "Cash",
      "Total Pay Receiver": order.total_birr || 0.0,
      Sender: `${order.sender.first_name} ${order.sender.last_name}`,
      "Sender Phone": order.sender.phone_number,
      "Sender Address": "13103 BRITTANY DR",
      "Sender City": "SILVER SPRING, Maryland-",
      "Sender State": "Maryland",
      "Sender Zip": "20910",
      "Birthday Sender": "08/01/1987",
      "Sender SSN": "123-45-6789",
      "Name Type Id Sender": "Driver License",
      "Number Id Sender": "620488013025",
      "Sender State Identification": "Maryland",
      "Sender Country Identification": "United States",
      Receiver: `${order.receiver.first_name} ${order.receiver.last_name}`,
      "Receiver Phone": order.receiver.phone_number,
      "Receiver Address": "Unknown",
      "Receiver City": "ADDIS ABABA GPO",
      "Receiver State": "Ethiopia",
      "Receiver Country": "Ethiopia",
      Status: order.status,
      "Payee Reference": "SE001-3",
      "Employee Code": "Marefat",
      "Payee Agency": "Pa001 ehtiopia payee partner",
      "Point of Payment": "ehtiopia payee partner",
      "Mode Pay Receiver": "BANK DEPOSIT",
      Bank: order.receiver.default_bank.bank,
      "Bank Account": order.receiver.default_bank.account,
      "Id Sender": "208495",
      "Notes Receiver": "No additional notes",
      Company: "Selam Express",
      "ID Branch": "SE001",
      "Name Agency": "Agency Saleemexpress, United States",
      "Address Agency": "8205 fenton street",
      "City Agency": "SILVER SPRING,Maryland-20910",
      "State Agency": "Maryland",
      Zip_Agency: 20910,
      "Id Country Transmitter": "United States",
      "Id Country National": "United States",
      "Sender Sex": "M",
      Citizenship: "United States",
      "Send Date": moment().format("MM/DD/YYYY h:mm:ss A"),
    }));

    // Create a new worksheet
    const ws = XLSX.utils.json_to_sheet(formattedData);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    // Generate Excel file and trigger download
    const fileName = `Order_${moment().format("YYYYMMDD_HHmmss")}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card
        title={
          <Typography.Title
            level={4}
            style={{ marginBottom: 0, color: "#231e61" }}
          >
            Orders Management
          </Typography.Title>
        }
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <OrderFilter />
        <Tabs defaultActiveKey="1">
          <TabPane style={{ marginTop: "15px" }} tab=" Summary Report" key="1">
            <SummaryReport />
          </TabPane>
          <TabPane style={{ marginTop: "15px" }} tab="Order List" key="2">
            <Button
              onClick={handleExport}
              style={{ marginBottom: "16px", width: "100%" }}
            >
              Export Orders
            </Button>
            <ListOfOrders loading={false} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default OrdersPage;
