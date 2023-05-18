import React from 'react'
import { Container } from './CarReservations'
import Header from '../components/Header'
import { Body } from './AddCarReservation'
import styled from 'styled-components'
import Footer from '../components/Footer'
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const CardContainer = styled.div`
    margin: 90px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

 `

 /*
const Button = styled.button`
  width: 200px;
  border: none;
  padding: 15px;
  background-color: #ADD8E6;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease-in-out;
  :hover{
    background-color: #0c5a6e;
  }
`
*/

const booknowbuttonStyles = {
  backgroundColor: '#2A96B8',
  color: 'white',
  padding: '3px 5px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  fontSize: '14px',

};

const Cars = () => {
  return (

    //cars container for displaying all cars
    <Container>
    <Header />
    <Body>
      <CardContainer>
          <Card sx={{ minWidth: 200 }}>
            <CardContent>
              <Typography variant="h5" component="div">Hyundai Elantra </Typography>
              <Typography><img src = 'https://www.popularcar.com/wp-content/uploads/2017/10/hyundai-elantra.png' alt="Hyundai Elantra" /></Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Vehicle Type : Sedan EV</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>100$ per Day</Typography>
              <Button><Link to={'/add-carreservation'} style = {booknowbuttonStyles}>Book Now </Link></Button>
            </CardContent>
          </Card>

        <Card sx={{ minWidth: 200 }}>
          <CardContent>
              <Typography variant="h5" component="div">Honda CRV</Typography>
              <Typography><img src='https://trafficcontrolmarketing.com/dealer_photos/Honda/2022/CR-VHybrid/images/trims/ex-l.png' alt="Honda CRV" /></Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Vehicel Type : SUV  Luxury</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>140$ per day</Typography>
              <Button><Link to={'/add-carreservation'} style = {booknowbuttonStyles}>Book Now </Link></Button>
          </CardContent>
         </Card>

        <Card sx={{ minWidth: 200 }}>
          <CardContent>
              <Typography variant="h5" component="div">Maxda 3</Typography>
              <Typography><img src='https://www.popularcar.com/wp-content/uploads/2017/10/mazda3.png' alt = "Maxda 3"/></Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Vehicle Type : Sedan Sport</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> 90$ per day</Typography>
              <Button><Link to={'/add-carreservation'} style = {booknowbuttonStyles}>Book Now </Link></Button>
          </CardContent>`
        </Card>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
              <Typography variant="h5" component="div">Hyundai Accent</Typography>
              <Typography><img src='https://www.popularcar.com/wp-content/uploads/2017/09/hyundai-accent.png' alt = "Hyundai Accent"/></Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Vehicle Type : Sedan  Economy</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>30$ per day</Typography>
              <Button><Link to={'/add-carreservation'} style = {booknowbuttonStyles}>Book Now </Link></Button>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 200 }}>
        <CardContent>
              <Typography variant="h5" component="div">Honda Shuttle Hybrid</Typography>
              <Typography><img src='https://www.popularcar.com/wp-content/uploads/2017/10/honda-shuttle.png' alt = "Honda Shuttle Hybrid"/></Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Vehicle Type : Hatchback  Economy</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>20$ per day</Typography>
              <Button><Link to={'/add-carreservation'} style = {booknowbuttonStyles}>Book Now </Link></Button>
        </CardContent>
      </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
              <Typography variant="h5" component="div">Toyota Camry</Typography>
              <Typography><img src='https://www.popularcar.com/wp-content/uploads/2017/10/2016-Toyota-Camry-e1509585653335.png' alt = "Toyota Camry"/></Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Vehicle Type : Sedan  Luxury</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>100$ per day</Typography>
              <Button><Link to={'/add-carreservation'} style = {booknowbuttonStyles}>Book Now </Link></Button>
          </CardContent>
        </Card>
     </CardContainer>
    </Body>
    <Footer/>
  </Container>
  )
}

export default Cars;