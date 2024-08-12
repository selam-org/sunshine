import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    icon: (
      <Link to="/">
        <PieChartOutlined />{" "}
      </Link>
    ),
    label: "Option 1",
  },
  {
    key: "2",
    icon: (
      <Link to="/test">
        <DesktopOutlined />
      </Link>
    ),
    label: "Option 2",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Option 3",
  },
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: "10%",
        backgroundColor: "#001529",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    </div>
  );
};
export default App;
