import React, { useRef } from "react";
import { Col, Row, Button } from "antd";
import SHA256 from "crypto-js/sha256";

// import "./Receipt.css";
import "../style/components/receipt.css";
import { useReactToPrint } from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
const Receipt = (props) => {
  const { order } = props;
  console.log(order, "order");
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
            <ReceiptContent order_detail={order} receiptTo="Customer" />
          </div>
          <ReceiptContent order_detail={order} receiptTo="Agent" />
        </div>
      </div>
      <Button
        type="link"
        icon={<PrinterOutlined style={{ color: "#231e61" }} />}
        style={{
          color: "#231e61",
          fontSize: "16px",
          fontWeight: "bold",
        }}
        onClick={handlePrint}
      >
        Print Receipt
      </Button>
    </>
  );
};
const ReceiptContent = (props) => {
  const { order_detail } = props;
  function formatTimestamp(timestamp) {
    const date = new Date(Number(timestamp));

    let month = date.getMonth() + 1; // Months are zero-based
    let day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    // Add leading zeros to single-digit numbers
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    const hString = hours < 10 ? "0" + hours : hours;
    const mString = minutes < 10 ? "0" + minutes : minutes;
    const sString = seconds < 10 ? "0" + seconds : seconds;

    return `${month}/${day}/${year} ${hString}:${mString}:${sString} ${ampm}`;
  }

  function generateInvoiceNumber() {
    const prefix = "SE001-";
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number between 100000 and 999999
    return prefix + randomNumber;
  }

  const formatAddress = (sender) => {
    if (!sender || !sender.address) {
      return " ";
    }

    const { street, city, state } = sender.address;
    const addressParts = [street, city, state].filter(Boolean); // Filter out null/undefined/empty strings
    const formattedAddress = addressParts.join(", ");

    return formattedAddress;
  };

  const formatZip = (sender) => {
    return sender?.address?.zip_code || " ";
  };

  function generateConfirmationNumber() {
    let result = "";
    for (let i = 0; i < 12; i++) {
      const randomDigit = Math.floor(Math.random() * 10); // Generates a digit between 0 and 9
      result += randomDigit.toString();
    }
    return result;
  }
  const sender_obj = {
    id: "123456789",
    sender_first_name: order_detail.sender.first_name,
    sender_last_name: order_detail.sender.last_name,
    sender_phone: order_detail.sender.phone_number,
    sender_address: formatAddress(order_detail.sender),
    sender_zip: formatZip(order_detail.sender),
  };

  const receiver_obj = {
    id: "987654321",
    receiver_first_name: order_detail.receiver.first_name,
    receiver_last_name: order_detail.receiver.last_name,
    receiver_phone: order_detail.receiver.phone_number,
    receiver_address: "ADDIS ABABA, ETHIOPIA",
  };

  const payment_info_obj = {
    bank_name: order_detail.bank.bank,
    branch: "/",
    bank_account: order_detail.bank.account,
    account_type: "Savings",
    mode_pay_receiver: "Bank Deposit",
  };

  const order = {
    date: formatTimestamp(order_detail.created_at), // order_detail.created_at,
    invoice_number: generateInvoiceNumber(),
    confirmation_no: generateConfirmationNumber(),
    net_amount_receiver: order_detail.total_usd.toFixed(2),
    rate_change_receiver: order_detail.rate,
    fee: order_detail.commission,
    total_pay_receiver: order_detail.total_birr.toFixed(2),
  };

  const receiptTo = "Customer";

  const generateIdentifier = (phone, firstName, lastName) => {
    const data = `${phone}${firstName}${lastName}`.toLowerCase();

    // Generate a hash from the data
    const hash = SHA256(data).toString();

    // Convert hash to a number
    const hashInt = parseInt(hash, 16);

    // Extract a 6-digit identifier, starting from 100000
    const identifier = 100000 + (hashInt % 900000); // Ensures it's between 100000 and 999999
    return identifier.toString();
  };

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
      <div className="agency-info-container">
        <p className="receipt-agency-title">Agency Saleemexpress - SE001</p>
        <p className="agency-info">8205 fenton street</p>
        <p className="agency-info agency-location">
          SILVER SPRING Maryland 23233 United States
        </p>
      </div>
      <div className="agency-row-container">
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
            <p>
              {generateIdentifier(
                sender_obj.sender_phone,
                sender_obj.sender_first_name,
                sender_obj.sender_last_name
              )}
            </p>
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
          <Col span={10} className="key-col">
            <p>Zip Code/ :</p>
          </Col>
          <Col span={14} className="pair-col-bold">
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
            <p>
              {generateIdentifier(
                receiver_obj.receiver_phone,
                receiver_obj.receiver_first_name,
                receiver_obj.receiver_last_name
              )}
            </p>
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
          <p className="td td-2 pair-col">
            USD {order.net_amount_receiver - order.fee}
          </p>
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
            USD {parseFloat(order.net_amount_receiver)}
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
          exchange rates. The transfer may take three to five days. Exchange
          Charges: If a sending customer requests payment to a beneficiary in
          non-U.S currency. Selam Express will also retain as revenue any
          difference between the retail currency exchange rate charged to the
          sending customer and the wholesale currency exchange rate by SELAM
          EXPRESS. LIMITATION OF LIABILITY: SELAM EXPRESS's liability is limited
          to the U.S dollar amount shown on the face of this receipt including
          service charges places by SELAM EXPRESS. SELAM EXPRESS shall not be
          liable for any indirect or consequential damages resulting from late
          delivery of your payment order, messages or refunds. No person is
          authorized to alter or waive the terms of this agreement on SELAM
          EXPRESS's behalf. PRIVACY: SELAM EXPRESS doe snot disclose any
          nonpublic personal or financial information about its customers to
          third parties, except as permitted by law and as necessary in
          processing and conducting the transaction you have requested and
          authorized. WARNING: Wiring money is just like sending cash. you can't
          get it back once it is gone. So, don't wire money to a stranger or to
          someone you haven't met in person. If you believe you were involved in
          a scamp, please contact us at (240)531-2646.
          <span className="receip-info-capital">
            CONSUMER FRAUD ALERT:-NEVER SEND MONEY TO SOMEONE YOU DON`T REALLY
            KNOW.
          </span>
        </p>
        <p className="red-info">
          BEWARE - Never send money to someone you don't really know!/ :
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
