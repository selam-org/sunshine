import React, { useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddSenderDialog,
  isAddSenderDialogOpen,
  addSenderApi,
  getAddSenderError,
  getAddSenderLoading,
  setSender,
  getSender,
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

  const capitalizeWords = (value) => {
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const sender = useSelector(getSender);

  const nestAddressValues = (values) => {
    const new_values = JSON.parse(JSON.stringify(values));
    const addressFields = ["street", "city", "state", "zip_code"];

    // Extract address fields from the flat structure
    const address = {};
    addressFields.forEach((field) => {
      if (new_values[field]) {
        address[field] = new_values[field];
        delete new_values[field]; // Remove from the root
      }
    });

    // Add the reshaped address to the values
    new_values.address = address;
    return new_values;
  };

  const onFinish = (values) => {
    console.log("Form values", values);
    dispatch(setSender(null));
    dispatch(addSenderApi(nestAddressValues(values)));
    form.resetFields(); // Clear form fields after submission
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (sender) {
      navigate("/order");
    }
  }, [sender]);

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
              onChange={(e) =>
                form.setFieldsValue({
                  first_name: capitalizeWords(e.target.value),
                })
              }
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
              onChange={(e) =>
                form.setFieldsValue({
                  last_name: capitalizeWords(e.target.value),
                })
              }
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
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Group style={{ marginBottom: "2%" }}>
              <Form.Item
                name="city"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "City is required",
                  },
                  {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: "City must only contain letters",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "39%",
                    marginRight: "1%",
                    borderRadius: "8px",
                    height: "40px",
                    borderColor: "#d9d9d9",
                  }}
                  placeholder="City"
                />
              </Form.Item>
              <Form.Item
                name="state"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "State is required",
                  },
                  {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: "State must only contain letters",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "39%",
                    marginRight: "1%",
                    borderRadius: "8px",
                    height: "40px",
                    borderColor: "#d9d9d9",
                  }}
                  placeholder="State"
                />
              </Form.Item>
              <Form.Item
                name="zip_code"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "ZIP code is required",
                  },
                  {
                    pattern: /^\d{5}(-\d{4})?$/,
                    message:
                      "ZIP code must be valid (e.g., 12345 or 12345-6789)",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "20%",
                    borderRadius: "8px",
                    height: "40px",
                    borderColor: "#d9d9d9",
                  }}
                  placeholder="ZIP Code"
                  maxLength={6}
                />
              </Form.Item>
            </Input.Group>
            <Form.Item
              name="street"
              label="Street Address"
              rules={[
                {
                  required: true,
                  message: "Street address is required",
                },
                {
                  pattern: /^[a-zA-Z0-9\s,.'-]{3,}$/,
                  message: "Street address must be valid",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                  marginBottom: "1%",
                  borderRadius: "8px",
                  height: "40px",
                  borderColor: "#d9d9d9",
                }}
                placeholder="Enter Street Address"
              />
            </Form.Item>
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
