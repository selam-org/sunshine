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
    const formattedData = orders.map(order => ({
      "Invoice": "SE001-3", // Default value
      "Confirmation No": "524475046535", // Default value
      "Agency": "SE001", // Default value
      "Date": moment(order.created_at).format("MM/DD/YYYY h:mm:ss A"), // Mapping created_at to Date
      "Send Currency": "Dollar", // Default value
      "Received Currency": "Ethiopian Birr", // Default value
      "Rate Change Receiver": order.rate || 50.0, // Use order.rate or default value 50.0
      "Net Amount Receiver": 100.0, // Default value
      "Fee": order.commission || 4.0, // Use order.commission or default value 4.0
      "Total": order.total_usd || 104.0, // Use order.total_usd or default value 104.0
      "Payment Type": "Cash", // Default value
      "Total Pay Receiver": order.total_birr || 5000.0, // Use order.total_birr or default value 5000.0
      "Sender": `${order.sender.first_name} ${order.sender.last_name}` || "LAMEK MERSO", // Use sender name or default
      "Sender Phone": order.sender.phone_number || "", // Use sender phone number or default
      "Sender Address": "13103 BRITTANY DR", // Default value
      "Sender City": "SILVER SPRING, Maryland-", // Default value
      "Sender State": "Maryland", // Default value
      "Sender Zip": "", // Default value
      "Birthday Sender": "08/01/1987", // Default value
      "Sender SSN": "", // Default value
      "Name Type Id Sender": "Driver License", // Default value
      "Number Id Sender": "620488013025", // Default value
      "Sender State Identification": "Maryland", // Default value
      "Sender Country Identification": "United States", // Default value
      "Receiver": `${order.receiver.first_name} ${order.receiver.last_name}` || "SHAMSIA NURBEGIE", // Use receiver name or default
      "Receiver Phone": order.receiver.phone_number || "", // Use receiver phone or default
      "Receiver Address": "", // Default value
      "Receiver City": "ADDIS ABABA GPO", // Default value
      "Receiver State": "Ethiopia", // Default value
      "Receiver Country": "Ethiopia", // Default value
      "Payee Reference": "SE001-3", // Default value
      "Employee Code": "Marefat", // Default value
      "Payee Agency": "Pa001 ehtiopia payee partner", // Default value
      "Point of Payment": "ehtiopia payee partner", // Default value
      "Mode Pay Receiver": "BANK DEPOSIT", // Default value
      "Bank": "Commercial Bank of Ethiopia", // Default value
      "Bank Account": order.receiver.default_bank.account || "1000202444133", // Use receiver bank account or default
      "Id Sender": "208495", // Default value
      "Notes Receiver": "", // Default value
      "Company": "Selam Express", // Default value
      "ID Branch": "SE001", // Default value
      "Name Agency": "Agency Saleemexpress, United States", // Default value
      "Address Agency": "8205 fenton street", // Default value
      "City Agency": "SILVER SPRING,Maryland-20910", // Default value
      "State Agency": "Maryland", // Default value
      "Zip_Agency": 20910, // Default value
      "Id Country Transmitter": "United States", // Default value
      "Id Country National": "United States", // Default value
      "Sender Sex": "M", // Default value
      "Citizenship": "United States", // Default value
      "Send Date": moment(order.created_at).format("MM/DD/YYYY h:mm:ss A"), // Mapping created_at to Send Date
    }));
  
    // Create a new worksheet
    const ws = XLSX.utils.json_to_sheet(formattedData);
  
    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
  
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "Orders_Report.xlsx");
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
