import React, { useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addBankDetailApi,
  setAddBankDetailModal,
  getAddBankDetailError,
  getAddBankDetailLoading,
  isAddBankDetailModalOpen,
  getBeneficiary,
} from "../store/reducers/senders";
const { Option } = Select;

const AddBankAccountModal = (props) => {
  const {disabled} = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const addBankDetailError = useSelector(getAddBankDetailError);
  const addBankDetailLoading = useSelector(getAddBankDetailLoading);
  const isModalOpen = useSelector(isAddBankDetailModalOpen);
  const beneficiaryData = useSelector(getBeneficiary);
  // List of banks as an array of objects
  const banks = [
    { id: 1, name: "Commercial Bank of Ethiopia" },
    { id: 2, name: "Awash Bank" },
    { id: 3, name: "Dashen Bank" },
    { id: 4, name: "Abyssinia Bank" },
    { id: 5, name: "Nib International Bank" },
    { id: 6, name: "United Bank" },
    { id: 7, name: "Wegagen Bank" },
    { id: 8, name: "Zemen Bank" },
    { id: 9, name: "Berhan Bank" },
    { id: 10, name: "Bunna International Bank" },
    { id: 11, name: "Abay Bank" },
    { id: 12, name: "Addis International Bank" },
    { id: 13, name: "Lion International Bank" },
    { id: 14, name: "Cooperative Bank of Oromia" },
    { id: 15, name: "Enat Bank" },
    { id: 16, name: "Oromia International Bank" },
    { id: 17, name: "Debub Global Bank" },
    { id: 18, name: "ZamZam Bank" },
    { id: 19, name: "Hijra Bank" },
    { id: 20, name: "Amhara Bank" },
    { id: 21, name: "Goh Betoch Bank" },
    { id: 22, name: "Siinqee Bank" },
    { id: 23, name: "Ahadu Bank" },
    { id: 24, name: "Hibret Bank" },
    { id: 25, name: "Tsehay Bank" },
  ];

  const showModal = () => {
    // setIsModalVisible(true);
    dispatch(setAddBankDetailModal({ open: true }));
  };

  const handleCancel = () => {
    // setIsModalVisible(false);
    dispatch(setAddBankDetailModal({ open: false }));
  };

  const onFinish = (values) => {
    // Handle form submission here, e.g., send the data to the backend
    // setIsModalVisible(false); // Close the modal after submission
    const id = beneficiaryData.id;  
    dispatch(addBankDetailApi(values, id));
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      <Button disabled={disabled} onClick={showModal} block>
        Add New Bank Detail
      </Button>
      <Modal
        title="Add New Account"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Hide default footer
        centered
      >
        <Form
          name="add_account"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Bank"
            name="bank"
            rules={[
              {
                required: true,
                message: "Please select a bank",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a bank"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {banks.map((bank) => (
                <Option key={bank.id} value={bank.name}>
                  {bank.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Account Number"
            name="account"
            rules={[
              {
                required: true,
                message: "Please enter the account number",
              },
              {
                pattern: new RegExp(/^\d+$/),
                message: "Please enter a valid account number",
              },
            ]}
          >
            <Input placeholder="Enter account number" />
          </Form.Item>

          <Form.Item>
            <Button 
            disabled={addBankDetailLoading}
            loading={addBankDetailLoading}

            type="primary" htmlType="submit" block>
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBankAccountModal;
