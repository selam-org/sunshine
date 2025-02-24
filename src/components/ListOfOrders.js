import React from "react";
import { Table, Tag, Space, Typography } from "antd";
import moment from "moment";
import { getOrders } from "../store/reducers/orders";
import { useSelector } from "react-redux";
import OrderDetailModal from "./OrderDetailModal";
import order_list from "../style/components/order_list.css";

const { Text } = Typography;

const OrdersTable = ({ loading }) => {
  const data = useSelector(getOrders);

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (text, record, index) => <Text strong>{index + 1}</Text>,
    },
    {
      title: "Sender",
      dataIndex: ["sender", "first_name"],
      key: "sender",
      render: (text, record) => (
        <Text
          strong
        >{`${record.sender.first_name} ${record.sender.last_name}`}</Text>
      ),
    },
    {
      title: "Sender Phone",
      dataIndex: ["sender", "phone_number"],
      key: "senderPhone",
      render: (phone) => <Text>{phone}</Text>,
    },
    {
      title: "Receiver",
      dataIndex: ["receiver", "first_name"],
      key: "receiver",
      render: (text, record) => (
        <Text>{`${record.receiver.first_name} ${record.receiver.last_name}`}</Text>
      ),
    },
    {
      title: "Total (USD)",
      dataIndex: "sent_usd",
      key: "total_usd",
      render: (amount) => <Text>{`$${amount.toLocaleString()}`}</Text>,
    },
    {
      title: "Total (Birr)",
      dataIndex: "total_birr",
      key: "total_birr",
      render: (amount) => <Text>{`${amount.toLocaleString()} ETB`}</Text>,
    },
    {
      title: "Fee",
      dataIndex: "commission",
      key: "commission",
      render: (fee) => <Text>{`$${fee.toLocaleString()}`}</Text>,
    },
    {
      title: "Grand Total",
      dataIndex: "total_usd",
      key: "total_usd",
      render: (total) => <Text strong>{`$${total.toLocaleString()}`}</Text>,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (rate) => (
        <Tag color="blue" style={{ fontSize: "14px" }}>
          {rate.toFixed(2)}
        </Tag>
      ),
    },

    {
      title: "Date",
      dataIndex: "created_at",
      key: "date",
      render: (date) => (
        <Text>{moment(parseInt(date)).format("YYYY-MM-DD hh:mm A")}</Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <OrderDetailModal order={record} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 40 }}
      // rowClassName={() => "editable-row"}
      rowClassName={(record) =>

        record.status === "void" ? "void-row" : "editable-row"
      }
      style={{ width: "100%", backgroundColor: "#fff", borderRadius: "8px" }}
    />
  );
};

export default OrdersTable;
