import React from "react";
import {
  ContainerOutlined,
  SearchOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Menu, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import "../style/components/navbar.css";

const { Title } = Typography;

const NavBar = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: <DollarOutlined />,
      label: (
        <Link to="/" className="navbar-link">
          New Orders
        </Link>
      ),
    },
    {
      key: "/orders",
      icon: <SearchOutlined />,
      label: (
        <Link to="/orders" className="navbar-link">
          Search Orders
        </Link>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#231e61", // Dark navy background
        padding: "0",
        display: "flex",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          width: "94%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Logo and Company Name Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "40px",
          }}
        >
          <img
            src="image.png" // Replace with your actual logo path
            alt="Logo"
            style={{
              height: "50px",
              marginRight: "16px",
            }}
          />
          <Title
            level={3}
            style={{
              color: "#ffffff",
              margin: 0,
              fontWeight: "bold",
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "1px",
            }}
          >
            ADDIS EXPRESS
          </Title>
        </div>

        {/* Menu Items */}
        <Menu
          mode="horizontal"
          theme="dark"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "24px",
            flexGrow: 1,
            lineHeight: "64px",
            backgroundColor: "#231e61", // Matches the navbar background
            borderBottom: "none",
          }}
          className="custom-menu"
        />
      </div>
    </div>
  );
};

export default NavBar;
