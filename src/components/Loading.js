import React from "react";
import { Flex, Spin } from "antd";
import "../style/components/loading.css";
const App = () => (
  //   <Flex lign="center" gap="middle">
  <div
    style={{
      height: "40vh",
      width: "60vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Spin size="large" />
  </div>
);
export default App;
