import React, { useMemo } from "react";
import { Table, Typography } from "antd";
import { getOrders } from "../store/reducers/orders";
import { useSelector } from "react-redux";

const SummaryReportTable = () => {
  const orders = useSelector(getOrders);

  const totals = useMemo(() => {
    const summary = orders.reduce(
      (acc, order) => {
        acc.totalFee += order.commission;
        acc.totalSentUSD += order.sent_usd;
        acc.totalBirr += order.total_birr;
        acc.totalGrandTotal += order.total_usd;
        if (order.status === "void") {
          acc.voidOrdersCount += 1;
        }
        acc.totalOrders += 1;
        return acc;
      },
      {
        totalFee: 0,
        totalSentUSD: 0,
        totalBirr: 0,
        totalGrandTotal: 0,
        totalOrders: 0,
        voidOrdersCount: 0,
      }
    );

    return summary;
  }, [orders]);

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <Typography.Text strong style={{ color: "#231e61" }}>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Typography.Text
          strong
          style={{
            color: "#000",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            transition: "color 0.3s ease, transform 0.3s ease",
          }}
          className="amount-text"
        >
          {amount.toLocaleString()}
        </Typography.Text>
      ),
    },
  ];

  const summaryData = [
    {
      key: "1",
      description: "Total Fee",
      amount: `$${totals.totalFee}`,
    },
    {
      key: "2",
      description: "Total Sent (USD)",
      amount: `$${totals.totalSentUSD}`,
    },
    {
      key: "3",
      description: "Total in Birr",
      amount: `${totals.totalBirr} ETB`,
    },
    {
      key: "4",
      description: "Grand Total (USD)",
      amount: `$${totals.totalGrandTotal}`,
    },
    {
      key: "5",
      description: "Total Number of Orders",
      amount: totals.totalOrders,
    },
    {
      key: "6",
      description: "Total Void Orders",
      amount: totals.voidOrdersCount,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={summaryData}
      pagination={false}
      rowClassName={() => "editable-row"}
      style={{ width: "100%", backgroundColor: "#fff", borderRadius: "8px" }}
    />
  );
};

export default SummaryReportTable;
