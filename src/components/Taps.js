import React, { useState } from "react";
import { Tabs } from "antd";
import {
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
const { TabPane } = Tabs;

const App = () => {
  return (

    <div style={{ marginBottom: "16px" }}>
        
      <Tabs
        defaultActiveKey="1"
        tabBarStyle={{ borderBottom: "1px solid #d9d9d9" }}
      >
        <TabPane
          tab={
            <span>
              <PhoneOutlined />
            </span>
          }
          key="1"
        />
        <TabPane
          tab={
            <span>
              <UserOutlined />
            </span>
          }
          key="2"
        />
        <TabPane
          tab={
            <span>
              <CalendarOutlined />
            </span>
          }
          key="3"
        />
        <TabPane
          tab={
            <span>
              <CreditCardOutlined />
            </span>
          }
          key="4"
        />
      </Tabs>
    </div>
  );
};
export default App;
