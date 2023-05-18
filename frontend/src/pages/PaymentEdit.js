import axios from "axios";
import Layout from "../components/Layout";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  InputLabel,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const PaymentEdit = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState();
  const id = useParams().id;
  const labelStyles = { mb: 1, mt: 2, fontSize: "15px", fontWeight: "bold" };
  const statusOptions = ["Pending", "Approve", "Failed"];
  console.log(id);

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fectchDetails = async () => {
    const res = await axios
      .get(`http://localhost:8080/api/v1/payments/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fectchDetails().then((data) => {
      setPayment(data.payment);
      setInputs({
        Hname: data.payment.Hname,
        bank: data.payment.bank,
        card_number: data.payment.card_number,
        cvv: data.payment.cvv,
        status: data.payment.status,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:8080/api/v1/payments/update/${id}`, {
        Hname: inputs.Hname,
        bank: inputs.bank,
        card_number: inputs.card_number,
        cvv: inputs.cvv,
        status: inputs.status,
      })
      .catch((err) => console.log(err));
    message.success("Updated Successfully");
    const data = await res.data;
    return data;
  };
  console.log(payment);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/allpayment/"));
  };

  return (
    <Layout>
      <div>
        {inputs && (
          <form onSubmit={handleSubmit}>
            <Box
              border={3}
              borderColor="gray"
              borderRadius={10}
              boxShadow="10px 10px 20px #ccc"
              padding={10}
              paddingTop={0.5}
              paddingBottom={5}
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="50%"
            >
              <Typography
                fontWeight={"bold"}
                padding={3}
                color="black"
                variant="h4"
                textAlign={"center"}
              >
                Edit Payment
              </Typography>
              <InputLabel sx={labelStyles}>Name on Card</InputLabel>
              <TextField
                name="Hname"
                onChange={handleChange}
                value={inputs.Hname}
                margin="auto"
                variant="outlined"
              />

              <InputLabel sx={labelStyles}>Bank Name</InputLabel>
              <TextField
                name="bank"
                onChange={handleChange}
                value={inputs.bank}
                margin="auto"
                variant="outlined"
              />

              <InputLabel sx={labelStyles}>Card No</InputLabel>
              <TextField
                name="card_number"
                onChange={handleChange}
                value={inputs.card_number}
                margin="auto"
                variant="outlined"
                disabled
              />

              <InputLabel sx={labelStyles}>CVV</InputLabel>
              <TextField
                name="cvv"
                onChange={handleChange}
                value={inputs.cvv}
                margin="auto"
                variant="outlined"
                disabled
              />

              <InputLabel sx={labelStyles}>Status</InputLabel>
              <TextField
                name="status"
                onChange={handleChange}
                value={inputs.status}
                margin="auto"
                variant="outlined"
              />
              <Button
                sx={{ mt: 4, borderRadius: 4 }}
                variant="contained"
                type="submit"
              >
                Update
              </Button>
            </Box>
          </form>
        )}
      </div>
    </Layout>
  );
};
export default PaymentEdit;
