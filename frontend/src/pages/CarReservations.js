import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { Body } from './AddCarReservation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Footer from '../components/Footer';
import { Button } from '@mui/material';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

//styled components
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const TableContainer = styled.div`
  margin: 90px 0;
`;

const deletebuttonStyles = {
  backgroundColor: 'red',
  color: 'white',
  padding: '3px 5px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  fontSize: '14px',
};

const updatebuttonStyles = {
  backgroundColor: 'forestgreen',
  color: 'white',
  padding: '3px 5px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'outset',
  outline: 'none',
  fontSize: '14px',
};

const paynowbuttonStyles = {
  backgroundColor: 'cornflowerblue',
  color: 'white',
  padding: '3px 5px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  fontSize: '14px',
};

// Reservations page component
const CarReservations = () => {
  const componentPdf = useRef();
  const [reservations, setReservations] = useState([]);
  const id = localStorage.getItem('userId');
  const [filterdata, setFilterdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  //get all reservations of a user
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reservation/all/${id}`)
      .then((response) => {
        setReservations(response.data.user);
        setFilterdata(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //delete reservation
  const handleDelete = (reservationId) => {
    axios
      .delete(`http://localhost:5000/api/reservation/${reservationId}`)
      .then(() => {
        setReservations(reservations.filter((reservation) => reservation._id !== reservationId));
        alert('You have cancelled a reservation!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //generate pdf file
  const generatePDF = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: 'Reservations',
    //onAfterPrint:()=> alert("Data saved in PDF")
  });

  //search reservation
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);

    const filteredReservations = filterdata.filter(
      (carReservation) =>
        carReservation.carType.toLowerCase().includes(searchValue) ||
        carReservation.startDate.includes(searchValue) ||
        carReservation.endDate.includes(searchValue)
    );
    setReservations(filteredReservations);
  };

  //return reservations page
  return (
    <Container>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: '300px', height: '40px', fontSize: '18px' }}
        />
      </div>
      <Body>
        <TableContainer>
          <div clas>
            <Button variant="outlined" color="error" onClick={generatePDF}>
              Save to PDF
            </Button>
          </div>
          <div ref={componentPdf} style={{ width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Car Type</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation._id}>
                    <TableCell>{reservation.carType}</TableCell>
                    <TableCell>{reservation.firstName}</TableCell>
                    <TableCell>{reservation.lastName}</TableCell>
                    <TableCell>{reservation.email}</TableCell>
                    <TableCell>{reservation.phone}</TableCell>
                    <TableCell>{reservation.startDate.substring(0, 10)}</TableCell>
                    <TableCell>{reservation.endDate.substring(0, 10)}</TableCell>

                    <TableCell>
                      <Button onClick={() => handleDelete(reservation._id)} style={deletebuttonStyles}>
                        Delete
                      </Button>
                      <Button>
                        <Link to={`/update/${reservation._id}`} style={updatebuttonStyles}>
                          Update
                        </Link>
                      </Button>
                      <Button>
                        <NavLink to={'/payments'} style={paynowbuttonStyles}>
                          Pay Now
                        </NavLink>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </Body>
      <Footer />
    </Container>
  );
};

export default CarReservations;
