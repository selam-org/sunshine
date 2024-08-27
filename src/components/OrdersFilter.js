import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersLoading, getOrdersApiCall } from "../store/reducers/orders";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;

const OrderFilter = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getOrdersLoading);
  // const error = useSelector(getOrdersError);
  const [form] = Form.useForm();
  const [fieldStyles, setFieldStyles] = useState({});

  const handleValuesChange = (changedValues, allValues) => {
    const updatedStyles = {};

    Object.keys(allValues).forEach((key) => {
      if (allValues[key] && allValues[key] !== "") {
        updatedStyles[key] = {
          backgroundColor: "#e6f7ff",
          borderColor: "#1890ff",
        };
      } else {
        updatedStyles[key] = {
          backgroundColor: "#ffffff",
          borderColor: "#d9d9d9",
        };
      }
    });

    setFieldStyles(updatedStyles);
  };

  useEffect(() => {
    // Initialize the styles based on default form values
    const initialValues = form.getFieldsValue();
    handleValuesChange(initialValues, initialValues);
  }, []);

  const handleSubmit = (values) => {
    const { dateRange, ...otherValues } = values;
    const formattedValues = {
      ...otherValues,
      start_date: dateRange ? dateRange[0].startOf("day").valueOf() : undefined,
      end_date: dateRange ? dateRange[1].endOf("day").valueOf() : undefined,
    };

    console.log("Filter Values with Dates:", formattedValues);

    // Dispatch or handle the submission here
    dispatch(getOrdersApiCall(formattedValues));
  };

  return (
    <Form
      form={form}
      layout="inline"
      onValuesChange={handleValuesChange}
      onFinish={handleSubmit}
      initialValues={{
        // dateRange: [, end_date],
        status: "",
      }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "16px",
        borderRadius: "12px",
        backgroundColor: "#f7faff",
      }}
    >
      <Form.Item name="sender_first_name" style={{ marginBottom: 0 }}>
        <Input
          placeholder="Sender First Name"
          size="small"
          style={{
            borderRadius: "20px",
            width: "160px",
            borderColor: fieldStyles.senderFirstName?.borderColor,
            backgroundColor: fieldStyles.senderFirstName?.backgroundColor,
          }}
        />
      </Form.Item>

      <Form.Item name="sender_last_name" style={{ marginBottom: 0 }}>
        <Input
          placeholder="Sender Last Name"
          size="small"
          style={{
            borderRadius: "20px",
            width: "160px",
            borderColor: fieldStyles.senderLastName?.borderColor,
            backgroundColor: fieldStyles.senderLastName?.backgroundColor,
          }}
        />
      </Form.Item>

      <Form.Item name="receiver_first_name" style={{ marginBottom: 0 }}>
        <Input
          placeholder="Beneficiary First Name"
          size="small"
          style={{
            borderRadius: "20px",
            width: "160px",
            borderColor: fieldStyles.beneficiaryFirstName?.borderColor,
            backgroundColor: fieldStyles.beneficiaryFirstName?.backgroundColor,
          }}
        />
      </Form.Item>

      <Form.Item name="receiver_last_name" style={{ marginBottom: 0 }}>
        <Input
          placeholder="Beneficiary Last Name"
          size="small"
          style={{
            borderRadius: "20px",
            width: "160px",
            borderColor: fieldStyles.beneficiaryLastName?.borderColor,
            backgroundColor: fieldStyles.beneficiaryLastName?.backgroundColor,
          }}
        />
      </Form.Item>

      <Form.Item name="sender_phone_number" style={{ marginBottom: 0 }}>
        <Input
          placeholder="Sender Phone"
          size="small"
          style={{
            borderRadius: "20px",
            width: "160px",
            borderColor: fieldStyles.senderPhone?.borderColor,
            backgroundColor: fieldStyles.senderPhone?.backgroundColor,
          }}
        />
      </Form.Item>

      <Form.Item
        name="dateRange"
        defaultValue={[moment(), moment()]}

        rules={[
          {
            type: "array",
            required: true,
            message: "Please select a date range",
          },
        ]}
      >
        <RangePicker
          size="small"
          // defaultChecked={[moment(), moment()]}
          style={{
            borderRadius: "20px",
            width: "260px",
            borderColor: fieldStyles.dateRange?.borderColor,
            backgroundColor: fieldStyles.dateRange?.backgroundColor,
          }}
          format="YYYY-MM-DD"
        />
      </Form.Item>

      <Form.Item name="status" style={{ marginBottom: 0 }}>
        <Select
          placeholder="Order Status"
          size="small"
          style={{
            borderRadius: "20px",
            width: "160px",
            borderColor: fieldStyles.status?.borderColor,
            backgroundColor: fieldStyles.status?.backgroundColor,
          }}
          dropdownStyle={{ borderRadius: "20px" }}
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          <Option value="">Not Void</Option>

          <Option value="void">Void</Option>
        </Select>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          loading={loading}
          disabled={loading}
          type="primary"
          htmlType="submit"
          size="small"
          style={{ borderRadius: "20px", width: "100px" }}
        >
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrderFilter;
