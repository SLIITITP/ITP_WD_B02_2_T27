import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import Footer from "../components/Footer";
import { message, Button } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentDetails = () => {
  const location = useLocation();
  const formValues = location.state;
  const navigate = useNavigate();
  const [id, setId] = useState(null);

  const handlePayNow = async (values) => {
    try {
      message.success("Your payment is successful");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  //update payemnt
  const handleEdit = (id) => {
    navigate("/editDetails/");
  };

  return (
    <>
      <Header />
      <div>
        {formValues && (
          <div
            style={{
              marginLeft: "500px",
              background: "#A9C4B9",
              paddingLeft: "20px",
              marginRight: "500px",
              marginTop: "20px",
              marginBottom: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
            }}
          >
            <h1>
              <center>Payment Details</center>
            </h1>
            <p>
              <strong>Name:</strong> {formValues.name}
            </p>
            <p>
              <strong>Email:</strong> {formValues.email}
            </p>
            <p>
              <strong>Phone:</strong> {formValues.phone}
            </p>
            <p>
              <strong>Address:</strong> {formValues.address}
            </p>
            <p>
              <strong>Country:</strong> {formValues.country}
            </p>
            <p>
              <strong>Country Code:</strong> {formValues.country_code}
            </p>
            <p>
              <strong>Card Holder Name:</strong> {formValues.Hname}
            </p>
            <p>
              <strong>Bank Name:</strong> {formValues.bank}
            </p>
            <p>
              <strong>Card Number:</strong> {formValues.card_number}
            </p>
            <p>
              <strong>CVV Code:</strong> {formValues.cvv}
            </p>
            <p>
              <strong>Zip/Postal Code:</strong> {formValues.code}
            </p>
            <p>
              <strong>Expiration Date:</strong> {formValues.date}
            </p>

            <Button
              style={{
                marginLeft: "150px",
                marginRight: "50px",
                backgroundColor: "#2A96B8",
              }}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              style={{ marginRight: "70px", backgroundColor: "#2A96B8" }}
              onClick={handlePayNow}
            >
              Pay Now
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PaymentDetails;
