import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { Container } from './CarReservations'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

//styling the page components
export const Body = styled.div`
  display: flex;
  justify-content: center;
`
export const Form = styled.div`
  background-color: #ECEFEE;
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
  width: 300px;
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

//creating the page component and adding the form to add a reservation
const AddReservation = () => {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    carType: "",
    firstName: "",
    lastName: "",
    email:"", 
    phone:"",
    country:"",
    startDate:"",
    endDate:"",
    licenseNumber:"",
  });

//   // Function to validate phone number
// const validatePhoneNumber = (phoneNumber) => {
//   const phonePattern = /^\+[0-9]{12}$/;
//   return phonePattern.test(phoneNumber);
  
// };


  //handling the input changes
  const handleChange = (e) => {

  // creating a new variable to store the name and value of the input
  const { name, value } = e.target;

  // Prevent selecting start date prior to current date
  if (name === "startDate") {
    const currentDate = new Date().toISOString().split("T")[0];
    if (value < currentDate) {
      alert('start date cannot be before the current date.');
      return;
    }
  }

  // Prevent selecting end date prior to the start date
  if (name === "endDate") {
    if (inputs.startDate && value < inputs.startDate) {
      alert('End date cannot be before the start date.');
      return;
    }
  }

  // //validate the phone number
  // if (name === "phone" && !validatePhoneNumber(value)) {
  //   console.log("Phone number is invalid. Please enter a valid phone number.");
  //   return;
  // }
  
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //sending the request to the backend
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/reservation/add", {
        carType: inputs.carType,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        phone: inputs.phone,
        country: inputs.country,
        startDate: inputs.startDate,
        endDate: inputs.endDate,
        licenseNumber: inputs.licenseNumber,

        user: localStorage.getItem("userId"),
      })
      .catch((err) => {
        console.log(err);
        alert('Error adding reservation')
      });
    const data = await res.data;
    return data;
  };

  //handling the submit button
  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log('inputs');
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/carreservations"));
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
        <Input name='phone' value={inputs.phone}  type='text' onChange={handleChange} placeholder='Phone Number' pattern="\\+[0-9]{12}" required maxLength={13}/>
        <select name='carType' value={inputs.carType}  onChange={handleChange}  required>
        <option value=''>Select Car Type</option>
        <option value='Sedan'> Sedan EV</option>
        <option value='Sedan EV'>SUV Luxury</option>
        <option value='SUV Luxury'> Sedan Sport</option>
        <option value='Sedan Economy'> Sedan Economy</option>
        <option value='Sedan Luxury'>Sedan Luxury</option>
        <option value= 'Hatchback Economy'>Hatchback Economy</option>
        </select>
        <Input name='country' value={inputs.country} type='text' onChange={handleChange} placeholder='Country' required/>
        <label>Start Date - <Input name='startDate' value={inputs.startDate} type='date' onChange={handleChange} placeholder='Start Date' required/></label>
        <label> End Date  - <Input name='endDate' value={inputs.endDate} type='date' onChange={handleChange} placeholder='End Date' required/></label>
        <Input name='licenseNumber' value={inputs.licenseNumber} type='text' onChange={handleChange} placeholder='License Number' required/> 
        <ButtonContainer>
          <Button onClick={handleSubmit}
          >Make Reservation</Button>
        </ButtonContainer>
      </Form>
    </Body>
    <Footer/>
  </Container>
  )
}

export default AddReservation