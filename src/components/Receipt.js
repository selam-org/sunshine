import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { Col, Row, Button } from "antd";
// import "./Receipt.css";
import "../style/components/receipt.css";
import { useReactToPrint } from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
const Receipt = ({ order }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div
        style={{
          display: "none",
        }}
      >
        <div
          style={{
            justifyContent: "center",
          }}
          ref={componentRef}
        >
          <div
            className="receipt-container"
            style={{
              pageBreakAfter: "always",
            }}
          >
            <ReceiptContent receiptTo="Customer" />
          </div>
          <ReceiptContent receiptTo="Agent" />
        </div>
      </div>
      <Button
        type="link"
        icon={<PrinterOutlined style={{ color: "#231e61" }} />}
        style={{
          color: "#231e61",
          fontSize: "16px",
          fontWeight: "bold",
          // backgroundColor: "green",
        }}
        onClick={handlePrint}
      >
        Print Receipt
      </Button>
    </>
  );
};
const ReceiptContent = () => {
  const sender_obj = {
    id: "123456789",
    sender_first_name: "John",
    sender_last_name: "Doe",
    sender_phone: "+1 555 555 5555",
    sender_address: "123 Main Street, Silver Spring, MD 20910",
    sender_zip: "20910",
  };

  const receiver_obj = {
    id: "987654321",
    receiver_first_name: "Jane",
    receiver_last_name: "Smith",
    receiver_phone: "+251 912 345 678",
    receiver_address: "456 Elm Street, Addis Ababa, Ethiopia",
  };

  const payment_info_obj = {
    bank_name: "Commercial Bank of Ethiopia",
    branch: "Addis Ababa Branch",
    bank_account: "1122334455",
    account_type: "Savings",
    mode_pay_receiver: "Bank Deposit",
  };

  const order = {
    date: "08/17/2024",
    invoice_number: "INV-2024-0001",
    confirmation_no: "CONF-2024-123456",
    net_amount_receiver: "1000.00",
    rate_change_receiver: "54.50",
    fee: "10.00",
    total_pay_receiver: "54500.00",
  };

  const receiptTo = "Customer";

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <p className="receipt-title">
          {"SELAM EXPRESS  : 8205 Fenton Street,Silver"}
        </p>
        <p className="receipt-title receipt-title-bottom">
          Spring,MD 20910 | UAN: 1-240 531 2646
        </p>
      </div>
      <HorizontalLine />
      <div
        style={{
          textAlign: "center",
        }}
      >
        <img
          src="/images/receipt-logo.png"
          className="receipt-logo"
          width={120}
          alt="receipt-logo"
        />
      </div>
      <HorizontalLine />
      <p className="receipt-agency-title">Agency Saleemexpress - SE001</p>
      <p className="agency-info">8205 fenton street</p>
      <p className="agency-info agency-location">
        SILVER SPRING Maryland 23233 United States
      </p>
      <div>
        <div className="agency-row">
          <p className="agency-info license">agent License/ :</p>
          <p className="agency-info">ag001</p>
        </div>
        <div className="agency-row">
          <p className="agency-info tel">Tel/ :</p>
          <p className="agency-info">+1 240 531 2646</p>
        </div>
      </div>
      <div className="copy-to">
        <p>{receiptTo} Copy/ :</p>
      </div>

      <div className="key-pair">
        <Row className="key-pair-row" align={"middle"}>
          <Col span={12} className="key-col">
            <p>Date/ :</p>
          </Col>
          <Col span={12} className="pair-col">
            <p>{order.date}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"middle"}>
          <Col span={12} className="key-col">
            <p>Invoice #/ :</p>
          </Col>
          <Col span={12} className="pair-col">
            <p>{order.invoice_number}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"middle"}>
          <Col span={12} className="key-col">
            <p>Txn Ref No/ : </p>
          </Col>
          <Col span={12} className="pair-col">
            <p>{order.confirmation_no}</p>
          </Col>
        </Row>
      </div>
      <HorizontalLine />
      <div className="key-pair">
        <Row className="key-pair-title">
          <Col span={24} className="pair-col-bold" align="middle">
            <p className="pair-col-bold ">SENDER/ :</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Account #/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>{sender_obj.id}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Name/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>{`${sender_obj.sender_first_name} ${sender_obj.sender_last_name}`}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Telephone/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>{sender_obj.sender_phone}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Address/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>{sender_obj.sender_address}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={13} className="key-col">
            <p>Zip Code/ :</p>
          </Col>
          <Col span={11} className="pair-col-bold">
            <p>{sender_obj.sender_zip}</p>
          </Col>
        </Row>
      </div>
      <HorizontalLine />
      <div className="key-pair">
        <Row className="key-pair-title">
          <Col span={24} className="pair-col-bold" align="middle">
            <p className="pair-col-bold ">BENEFICIARY/ :</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Account #/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>{receiver_obj.id}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Name/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>{`${receiver_obj.receiver_first_name} ${receiver_obj.receiver_last_name}`}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Telephone/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>{receiver_obj.receiver_phone}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Address/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>{receiver_obj.receiver_address}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Bank/Branch/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>
              {payment_info_obj.bank_name} {payment_info_obj.branch}
            </p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Account/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>{payment_info_obj.bank_account}</p>
          </Col>
        </Row>
        <Row className="key-pair-row" align={"top"}>
          <Col span={10} className="key-col">
            <p>Type/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
            <p>{payment_info_obj.account_type}</p>
          </Col>
        </Row>
      </div>
      <HorizontalLine />
      <Row className="key-pair-title  amount-title">
        <Col span={24} className="pair-col-bold" align="middle">
          <p className="pair-col-bold ">AMOUNT AND CHARGES/ :</p>
        </Col>
      </Row>
      <div className="receipt-table">
        <div className="row">
          <p className="td td-1 pair-col-bold">Amount/ :</p>
          <p className="td td-2 pair-col">USD {order.net_amount_receiver}</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col">Rate/ :</p>
          <p className="td td-2 pair-col">ETB {order.rate_change_receiver}</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col">Fee :</p>
          <p className="td td-2 pair-col">USD {order.fee}</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col">Handling/ :</p>
          <p className="td td-2 pair-col">0.00</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col-bold">Total Charges/ :</p>
          <p className="td td-2 pair-col">USD {order.fee}</p>
        </div>
        <div className="row ">
          <p className="td td-1 pair-col-bold reward-row">Reward Amount/ :</p>
          <p className="td td-2 pair-col">USD 0.00</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col-bold">Total Tax/ :</p>
          <p className="td td-2 pair-col">USD 0.00</p>
        </div>
        <div className="row">
          <p className="td td-1 pair-col-bold">Total/ :</p>
          <p className="td td-2 pair-col">
            USD {parseFloat(order.net_amount_receiver) + parseFloat(order.fee)}
          </p>
        </div>
      </div>
      <Row className="key-pair-title">
        <Col span={24} className="pair-col-bold" align="middle">
          <p className="pair-col-bold ">Payee/ :</p>
        </Col>
      </Row>
      <Row className="key-pair-row" align={"middle"}>
        <Col span={10} className="key-col">
          <p>Confirmation</p>
          <p> No./ :</p>
        </Col>
        <Col span={14}>
          <span className="confirmation-no-value">{order.confirmation_no}</span>
        </Col>
      </Row>
      <Row className="key-pair-row" align={"top"}>
        <Col span={10} className="key-col">
          <p>Delivery Type :</p>
        </Col>
        <Col span={14} className="pair-col-bold">
          <p>{payment_info_obj.mode_pay_receiver}</p>
        </Col>
      </Row>
      <Row className="key-pair-row" align={"top"}>
        <Col span={14} className="key-col">
          <p>Will Pay/ :</p>
        </Col>
        <Col span={8} className="pair-col-bold">
          <p>ETB {order.total_pay_receiver}</p>
        </Col>
      </Row>
      <Row className="key-pair-row" align={"top"}>
        <Col span={10} className="key-col">
          <p>Message :</p>
        </Col>
      </Row>
      <HorizontalLine />
      <Row className="key-pair-title">
        <Col span={24} align="middle">
          <p className="pair-col-bold">
            Important Notices/ : Conditions of Services/
          </p>
        </Col>
      </Row>
      <p className="pair-col-bold" style={{ marginTop: -7 }}>
        :
      </p>

      <div className="receipt-info">
        <p>
          RIGHT TO REFUND:-You the customer can cancel your transaction for full
          refund within 30 minutes after you place your transaction unless the
          fund picked up or deposited. If your order was placed more than 30
          minutes prior to your requesting a refund, you are entitled to a
          refund of all money received for transmittal within ten (10) days of
          receipt of a written request for refund unless any of the following
          occurs :(a)The money have been transmitted and delivered to the
          recipient prior to receipt of the written request for a refund;(b)
          Instruction have been given committing an equivalent amount of money
          the person designated by the customer prior to receipt of a written
          request for a refund; (c)The company and/or its authorized delegate
          has reason to believe that a crime has occurred, is occurring or may
          potentially occur as a result of transmitting the money as requested
          by the customer or refunding the money as requested by the customer,
          or (d) The company is the otherwise barred by the law from making a
          refund. TRANSACTION TO ACCOUNTS:-Please make sure the account number,
          Bank details, and mobile number are correct before sending. Otherwise,
          Money will be sent to the wrong account and the company is not
          responsible. The company makes money from currency exchange, when you
          choosing a money transmitter carefully compare both transfer fee and
          exchange rates. The transfer may take three to five days.
          <span className="receip-info-capital">
            CONSUMER FRAUD ALERT:-NEVER SEND MONEY TO SOMEONE YOU DON`T REALLY
            KNOW.
          </span>
        </p>
        <p className="red-info">
          BEWARE - Never send money to someone you don't really know!/ :
        </p>
        <p className="sign-info">
          By signing this form, you agree to the terms and conditions of the
          service./ :
        </p>
        <HorizontalLine />
        <Row className="key-pair-title">
          <Col span={24} align="middle">
            <p className="send-signature">sender signature/ :</p>
          </Col>
        </Row>
        <HorizontalLine />
        <Row className="key-pair-title">
          <Col span={24} align="middle">
            <p>Cashier Signature</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const HorizontalLine = ({ className }) => {
  return <div className={`horizontal-line ${className}`}></div>;
};

// const HorizontalLine = ({ className }) => {
//   return <div className={`horizontal-line ${className}`}></div>;
// };

export default Receipt;
