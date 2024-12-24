import { React, useEffect } from "react";
import { Modal, Button, Form, Input, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setUpdateBeneficiaryModal,
  isUpdateBeneficiaryModalOpen,
  updateBeneficiaryApi,
  getUpdateBeneficiaryError,
  getUpdateBeneficiaryLoading,
  getSender,
  getBeneficiary,
} from "../store/reducers/senders";

const { Title } = Typography;

const UpdateBeneficiaryModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(isUpdateBeneficiaryModalOpen);
  const loading = useSelector(getUpdateBeneficiaryLoading);
  const error = useSelector(getUpdateBeneficiaryError);
  const sender = useSelector(getSender);
  const beneficiary = useSelector(getBeneficiary);
  const [form] = Form.useForm();

  useEffect(() => {
    if (beneficiary) {
      form.setFieldsValue({
        first_name: beneficiary.first_name,
        last_name: beneficiary.last_name,
        phone_number: beneficiary.phone_number,
      });
    }
  }, [beneficiary, form]);

  const handleCancel = () => {
    dispatch(setUpdateBeneficiaryModal({ open: false }));
  };

  const capitalizeWords = (value) => {
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const onFinish = (values) => {
    if (sender) {
      values.sender_id = sender.id;
    }
    dispatch(updateBeneficiaryApi(values, beneficiary.id));
    form.resetFields();
  };

  return (
    <>
      <Modal
        title={
          <Title level={4} style={{ textAlign: "center", marginBottom: 0 }}>
            Edit Beneficiary
          </Title>
        }
        visible={isModalOpen}
        onCancel={handleCancel}
        disabled={loading}
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
          name="update_beneficiary"
          onFinish={onFinish}
          layout="vertical"
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
              onChange={(e) =>
                form.setFieldsValue({
                  first_name: capitalizeWords(e.target.value),
                })
              }
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
              onChange={(e) =>
                form.setFieldsValue({
                  last_name: capitalizeWords(e.target.value),
                })
              }
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
                pattern: /^\d{10}$/,
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
              Update Beneficiary
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateBeneficiaryModal;
