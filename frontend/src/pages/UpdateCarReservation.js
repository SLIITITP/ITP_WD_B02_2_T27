import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { Container } from './CarReservations'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

//styling the page components
export const Body = styled.div`
  display: flex;
  justify-content: center;
`
export const Form = styled.form`
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

//creating the page component and adding the form to add a reservation
const UpdateCarReservation = () => {
  const {id} = useParams();
  const [values, setValues] = useState({
        firstName : "",
        lastName : "",
        email : "",
        phone : "",
        carType : "",
        country : "",
        startDate : "",
        endDate : "",
        licenseNumber : "",



  });
  
  useEffect(() => {
    const getData = () => {
      axios
      .get(`http://localhost:5000/api/reservation/${id}`)
      .then((response) => {
        // setValues({...values, firstName : response.data.firstName,lastName : response.data.lastName,email : response.data.email,phone : response.data.phone});
        setValues(response.data.reservation)
      })
      .catch((error) => {
        console.log(error);
      });
    }; getData()
  },[id]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
   
  }
const navigate = useNavigate();
  const handleSubmit =(e) =>{
    console.log(values)
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/reservation/update/${id}`,values)
    .then((response) => {
      alert('Updated')
      navigate(`/carreservations`)
    })
    .catch((error) => {
      console.log(error);
    });
}


return (
  <Container>
  <Header />
  <Body>
    <Form onSubmit={handleSubmit}>
      <FormHeading>Update your personal details</FormHeading>
      <Input name='firstName' type='text' placeholder='First Name'  value={values.firstName} required onChange={handleChange} />
      <Input name='lastName'  type='text' placeholder='Last Name' value={values.lastName} required onChange={handleChange}/>
      <Input name='email'  type='email'  placeholder='Email' value={values.email} required onChange={handleChange}/>
      <Input name='phone'  type='text'  placeholder='Phone Number' value={values.phone} required maxLength={12} onChange={handleChange}/>
      <fieldset disabled = "disabled" >
      <select name='carType' value={values.carType}  onChange={handleChange}  required>
        <option value=''>Select Car Type</option>
        <option value='Sedan'> Sedan EV</option>
        <option value='Sedan EV'>SUV Luxury</option>
        <option value='SUV Luxury'> Sedan Sport</option>
        <option value='Sedan Economy'> Sedan Economy</option>
        <option value='Sedan Luxury'>Sedan Luxury</option>
        <option value= 'Hatchback Economy'>Hatchback Economy</option>
        </select></fieldset>
        <fieldset disabled = "disabled" ><Input name='country' value={values.country} type='text' onChange={handleChange} placeholder='Country' required/></fieldset>
        <fieldset disabled = "disabled" ><label>Start Date - <Input name='startDate' value={values.startDate} type='date' onChange={handleChange} placeholder='Start Date' required/></label></fieldset>
        <fieldset disabled = "disabled" ><label> End Date  - <Input name='endDate' value={values.endDate} type='date' onChange={handleChange} placeholder='End Date' required/></label></fieldset>
        <fieldset disabled = "disabled" ><Input name='licenseNumber' value={values.licenseNumber} type='text' onChange={handleChange} placeholder='NIC Number' required/> 
        </fieldset>
      <ButtonContainer>
        <Button type='submit'>Save</Button>
      </ButtonContainer>
    </Form>
  </Body>
  <Footer/>
</Container>
)
}


export default UpdateCarReservation