import React, { useState } from "react";
import { Form, Row, Col, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import paymentimg from "../assets/payment.png";
import styled from 'styled-components'
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";



const PaymentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("payments/payment", values);
      setLoading(false);

      // Pass the id value along with other form values
      navigate("/paymentDetails", { state: { id: data.id, ...values } });
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div>
        <Form layout="vertical" onFinish={handleSubmit} >
          <div>
            <img
              className="image"
              src={paymentimg}
              alt=""
              style={{ width: "500px", height: "100px", marginLeft: "350px" }}
            />
          </div>
          <h4 className="text" style={{ marginLeft: "8px" }}>
            <b>Personal Details</b>
          </h4>
          <Row
            gutter={30}
            style={{
              marginLeft: "4px",
              marginRight: "12px",
              fontweight: "bold",
            }}
          >
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                className="item"
                label={<span className="label-large">Name</span>}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "please enter your name",
                  },
                  { whitespace: true },
                  { min: 3 },
                ]}
              >
                <Input type="text" placeholder="Your name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<span className="label-large">Email</span>}
                className="item"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "please enter your email",
                  },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  type="email"
                  message="Please enter a valid email"
                  placeholder="Your email"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<span className="label-large">Phone</span>}
                className="item"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Phone number should contain ten integers only",
                  },
                ]}
              >
                <Input type="text" placeholder="Your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<span className="label-large">Address</span>}
                className="item"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "please enter your address",
                  },
                ]}
              >
                <Input type="text" placeholder="Your address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<span className="label-large">Country</span>}
                className="item"
                name="country"
                rules={[
                  {
                    required: true,
                    message: "please enter your country",
                  },
                ]}
              >
                <Input
                  type="text"
                  className="back"
                  placeholder="Your country"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                className="item"
                label={<span className="label-large">Country Code</span>}
                name="country_code"
                rules={[
                  {
                    required: true,
                    message: "Please enter your country code",
                  },
                  {
                    pattern: /^[0-9]{2}$/,
                    message: "Country code should contain two integers only",
                  },
                ]}
              >
                <Input type="text" placeholder="Your country code" />
              </Form.Item>
            </Col>

            <h4 className="text" style={{ marginLeft: "6px" }}>
              <b>Card Details</b>
            </h4>
            <Row gutter={30} style={{ marginLeft: "4px", marginRight: "12px" }}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label={<span className="label-large">Card Holder Name</span>}
                  className="item"
                  name="Hname"
                  rules={[
                    {
                      required: true,
                      message: "please enter card holder name",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Holder name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label={<span className="label-large">Bank Name</span>}
                  className="item"
                  name="bank"
                  rules={[
                    {
                      required: true,
                      message: "please enter bank name",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Bank name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label={<span className="label-large">Card Number</span>}
                  className="item"
                  name="card_number"
                  rules={[
                    {
                      required: true,
                      message: "please enter card number",
                    },
                    {
                      pattern: /^[0-9]{16}$/,
                      message: "please enter a 16-digit card number",
                    },
                  ]}
                >
                  <Input type="text" placeholder="0000 0000 0000 0000" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label={<span className="label-large">CVV Code</span>}
                  className="item"
                  name="cvv"
                  rules={[
                    {
                      required: true,

                      pattern: /^[0-9]{4}$/,
                      message: "CVV code must be 4 digits",
                    },
                  ]}
                >
                  <Input type="text" placeholder="0000" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label={<span className="label-large">Zip/Postal Code</span>}
                  className="item"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your zip/postal code",
                    },
                    {
                      pattern: /^[0-9]{5}$/,
                      message:
                        "Zip/Postal Code should contain five integers only",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Zip/Postal Code" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label={<span className="label-large">Expiration Date</span>}
                  className="item"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "please enter expiration date",
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn" type="submit">
                  Submit
                </button>
              </Col>
            </Row>
          </Row>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
