import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Row, Col } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";

const EditDetailsPage = () => {
  const location = useLocation();
  const formValues = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    message.success("Your Payment Details Updated Successfully");
    setLoading(false);
    navigate("/paymentDetails", { state: values });
  };

  return (
    <>
      <Header />
      <div>
        <Form
          layout="vertical"
          className="form1"
          onFinish={handleSubmit}
          initialValues={formValues}
        >
          <h1>
            <center>Edit Payment Details</center>
          </h1>

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
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input placeholder="Your email" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="Your contact no" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input placeholder="Your address" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please enter your country" },
                ]}
              >
                <Input placeholder="Your country" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Country Code"
                name="country_code"
                rules={[
                  { required: true, message: "Please enter your country code" },
                  {
                    pattern: /^[0-9]{2}$/,
                    message: "Country code should contain two integers only",
                  },
                ]}
              >
                <Input placeholder="Your country code" />
              </Form.Item>
            </Col>

            <h4 className="text" style={{ marginLeft: "8px" }}>
              <b> Details</b>
            </h4>

            <Row gutter={30} style={{ marginLeft: "4px", marginRight: "12px" }}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Card Holder Name"
                  name="Hname"
                  rules={[
                    {
                      required: true,
                      message: "Please enter card holder name",
                    },
                  ]}
                >
                  <Input placeholder="Card holder name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Bank Name"
                  name="bank"
                  rules={[
                    { required: true, message: "Please enter bank name" },
                  ]}
                >
                  <Input placeholder="Bank name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Card Number"
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
                  <Input placeholder="0000 0000 0000 0000" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="CVV Code"
                  name="cvv"
                  rules={[
                    {
                      required: true,

                      pattern: /^[0-9]{4}$/,
                      message: "CVV code must be 4 digits",
                    },
                  ]}
                >
                  <Input placeholder="0000" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Zip/Postal Code"
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
                  <Input placeholder="Zip/Postal Code" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Expiration Date"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "please enter expiration date",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item>
                  <Button
                    type="primary"
                    className="btn btn-primary form-btn"
                    htmlType="submit"
                    loading={loading}
                  >
                    Update
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Row>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default EditDetailsPage;
