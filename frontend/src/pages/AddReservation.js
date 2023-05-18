import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { Container } from './Reservations'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { Select, TextField } from '@mui/material'
//import { RadioGroup, Radio } from '@mui/material';


export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const Form = styled.div`
  background-color: #A9C4B9;
  width: 900px;
  margin: 90px 0;
  padding: 40px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`
export const FormHeading = styled.h2`
  grid-column: 1 / 3;
  text-align: center;
`
export const ButtonContainer = styled.div`
  grid-column: 1 / 3;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 10px;
`
export const Button = styled.button`
  width: 100px;
  border: none;
  padding: 15px;
  background-color: #2A96B8;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease-in-out;
  :hover{
    background-color: #0c5a6e;
  }
`
export const Input = styled.input`
  padding: 17px;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 16px;
`
export const select = styled.select`
  padding: 17px;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 16px;
`

const AddReservation = () => {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    flightName: "",
    firstName: "",
    lastName: "",
    email:"", 
    phone:"",
    country:"",
    date:"", 
    fClass:"", 
    noOfPassengers:"",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/reservation/add", {
        flightName: inputs.flightName,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        phone: inputs.phone,
        country: inputs.country,
        date: inputs.date,
        fClass: inputs.fClass,
        noOfPassengers: inputs.noOfPassengers,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => {
        console.log(err);
        alert('Error adding reservation')
      });
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log('inputs');
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/reservations"));
  };
  return (
    <Container>
    <Header />
    <Body>
      <Form>
        <FormHeading>Add Reservation</FormHeading>
        <Input name='firstName' value={inputs.firstName} onChange={handleChange} type='text' placeholder='First Name' required/>
        <Input name='lastName' value={inputs.lastName} onChange={handleChange} type='text' placeholder='Last Name' required/>
        <Input name='email' value={inputs.email}  type='email' onChange={handleChange} placeholder='Email' required/>
        <Input name='phone' value={inputs.phone}  type='tel' onChange={handleChange} placeholder='Phone Number' required maxLength={10}/>
        <Input name='flightName' value={inputs.flightName}  onChange={handleChange} type='text' placeholder='Flight Name' required/>
        <Input name='country' value={inputs.country} type='text' onChange={handleChange} placeholder='Country' required/>
        <Input name='date' value={inputs.date } onChange={handleChange} type='date' placeholder='Date' required />
        <select name='fClass'  value ={inputs.fClass} onChange={handleChange} required>
          <option value="">Select Class</option>
          <option value="First">First</option>
          <option value="Business">Business</option>
          <option value="Economy">Economy</option>
        </select>
        {/* <Input name='fClass' value={inputs.fClass}  type='text' onChange={handleChange} placeholder='Class' /> */}
        
        <Input name='noOfPassengers' value={inputs.noOfPassengers}  type='number' placeholder='Number of  Passengers' onChange={handleChange} required/>
        {/* Select Class
        <RadioGroup name="fClass" value={inputs.fClass} onChange={handleChange} required>
        <label>First</label><Radio value="First" />
        <label>Business</label><Radio value="Business"/>
        <label>Economy</label><Radio value="Economy"/>
      </RadioGroup> */}
        <ButtonContainer>
          <Button onClick={handleSubmit}
          >Save</Button>
        </ButtonContainer>
      </Form>
    </Body>
    <Footer/>
  </Container>
  )
}

export default AddReservation