import React, { useState } from "react";
import { Button, Modal, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import {
  getSendersLoading,
  isSendersDialogOpen,
  getSenders,
  setSenderIsDialog,
} from "../store/reducers/senders";
import SendersItem from "./SenderListItem";

const App = (props) => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(isSendersDialogOpen);
  const senders = useSelector(getSenders);
  const loading = useSelector(getSendersLoading);

  const handleCancel = () => {
    dispatch(setSenderIsDialog({ open: false }));
  };


  return (
    <>
      <Modal
        title={
          <Typography.Title
            level={3}
            style={{
              margin: 0,
              textAlign: "left",
              color: "#231e61", // Primary brand color
              fontFamily: "Bebas Neue, sans-serif",
            }}
          >
            Senders / Customers
          </Typography.Title>
        }
        open={isDialogOpen}
        footer={null} // Remove default footer buttons
        onCancel={handleCancel}
        bodyStyle={{
          overflowY: "scroll",
          scrollbarWidth: "none", /* For Firefox */
          padding: "14px", // Added padding for inner content
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        
      >
        <div
          style={{
            height: "60vh", // Set height of the modal
            width: "60vw", // Full width within the modal
            padding: "0 16px", // Add padding for a cleaner layout
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              {senders.length === 0 ? (
                <div>
                  <Typography.Text>No senders found</Typography.Text>
                </div>
              ) : (
                <>
                  {" "}
                  {senders.map((sender) => (
                    <SendersItem sender={sender} />
                  ))}
                </>
              )}
              {/* <SendersItem />
              <SendersItem />
              <SendersItem /> */}
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default App;
