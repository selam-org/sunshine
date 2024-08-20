import React from "react";
import { Modal, Button, Form, Input, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddBeneficiaryModal,
  isAddBeneficiaryModalOpen,
  addBeneficiaryApi,
  getAddBeneficiaryError,
  getAddBeneficiaryLoading,
  getSender,
} from "../store/reducers/senders";
const { Title } = Typography;

const AddBeneficiaryModal = (props) => {
  const id = props.id;
  const dispatch = useDispatch();
  const isModalOpen = useSelector(isAddBeneficiaryModalOpen);
  const loading = useSelector(getAddBeneficiaryLoading);
  const error = useSelector(getAddBeneficiaryError);
  const sender = useSelector(getSender);
  const [form] = Form.useForm(); // Antd Form instance

  const handleCancel = () => {
    dispatch(setAddBeneficiaryModal({ open: false }));
  };

  const onFinish = (values) => {
    console.log("Form values", values);
    console.log("Sender", sender);
    if (sender) {
      values.sender_id = sender.id;
    }
    if (!values.sender_id) {
      console.log("Sender ID is missing");
      values.sender_id = id;
    }
    dispatch(addBeneficiaryApi(values));
    console.log("Form values", values);
    // handle form submission here
    form.resetFields(); // Clear form fields after submission
  };

  return (
    <>
      <Modal
        title={
          <Title level={4} style={{ textAlign: "center", marginBottom: 0 }}>
            Add New Beneficiary
          </Title>
        }
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
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          name="add_beneficiary"
          onFinish={onFinish}
          layout="vertical"
          style={{ gap: "16px" }}
          form={form}
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
                padding: "10px",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
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
                padding: "10px",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
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
                pattern: new RegExp(/^\d{10}$/),
                message:
                  "Please enter a valid 10-digit phone number (xxxxxxxxxx)",
              },
            ]}
          >
            <Input
              placeholder="Enter phone number"
              maxLength={10}
              style={{
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              disabled={loading}
              style={{
                borderRadius: "8px",
                height: "40px",
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              Create Beneficiary
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBeneficiaryModal;
