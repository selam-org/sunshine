import React from "react";
import { Modal, Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddSenderDialog,
  isAddSenderDialogOpen,
  addSenderApi,
  getAddSenderError,
  getAddSenderLoading,
} from "../store/reducers/senders";
import { useNavigate } from "react-router-dom";
const AddSenderModal = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getAddSenderLoading);
  const error = useSelector(getAddSenderError);
  const isModalOpen = useSelector(isAddSenderDialogOpen);
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Antd Form instance

  const showModal = () => {
    dispatch(setAddSenderDialog({ open: true }));
  };

  const handleCancel = () => {
    dispatch(setAddSenderDialog({ open: false }));
  };

  const onFinish = (values) => {
    console.log("Form values", values);
    dispatch(addSenderApi(values));
    form.resetFields(); // Clear form fields after submission
    navigate("/order"); // Redirect to the senders page
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button
        type="primary"
        style={{
          backgroundColor: "#e6f7ff",
          borderColor: "#91d5ff",
          borderRadius: "8px",
          fontWeight: "500",
          color: "#333",
          padding: "0 24px",
          height: "40px",
          display: "flex",
          alignItems: "center",
        }}
        onClick={showModal}
      >
        Add New Sender
      </Button>
      <Modal
        title="Add New Sender"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        bodyStyle={{
          padding: "24px",
        }}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Form
          form={form}
          name="add_sender"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please enter the first name",
              },
            ]}
          >
            <Input
              placeholder="Enter first name"
              style={{
                borderRadius: "8px",
                height: "40px",
                borderColor: "#d9d9d9",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please enter the last name",
              },
            ]}
          >
            <Input
              placeholder="Enter last name"
              style={{
                borderRadius: "8px",
                height: "40px",
                borderColor: "#d9d9d9",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please enter the phone number",
              },
              {
                pattern: /^\d{10}$/,
                message:
                  "Please enter a valid 10-digit US phone number (xxxxxxxxxx)",
              },
            ]}
          >
            <Input
              placeholder="Enter phone number"
              maxLength={10}
              style={{
                borderRadius: "8px",
                height: "40px",
                borderColor: "#d9d9d9",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={loading}
              loading={loading}
              style={{
                backgroundColor: "#b7eb8f",
                borderColor: "#95de64",
                fontWeight: "bold",
                color: "#333",
                borderRadius: "8px",
                height: "40px",
              }}
            >
              Create Sender
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSenderModal;
