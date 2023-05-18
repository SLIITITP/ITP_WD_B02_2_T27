import axios from 'axios';
import Header from '../components/Header'
import styled from 'styled-components'
import Footer from '../components/Footer';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate  } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import {useReactToPrint} from 'react-to-print'
import React, { useEffect, useState,useRef } from 'react'
import { Edit, Delete, SearchOutlined } from '@mui/icons-material'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const TableContainer = styled.div``
const Input = styled.input`
  outline: none;
  border: 2px solid #efefef;
  padding: 5px 10px;
  height: 30px;
  border-radius: 5px;
  width: 300px;
`
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 20px;
`
const ToolBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
`
const Reservations = () => {
  const componentPdf = useRef();
  const [reservations, setReservations] = useState([]);
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reservation/all/${id}`)
      .then((response) => {
        setReservations(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //delete function
  const handleDelete = (reservationId) => {
    axios
      .delete(`http://localhost:5000/api/reservation/${reservationId}`)
      .then(() => {
        setReservations(reservations.filter((reservation) => reservation._id !== reservationId));
        alert("You have cancelled a reservation!")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //update function
  const handleClick = (id) => {
    navigate(`update/${id}`)
  }

  //generating reports
  const generatePDF= useReactToPrint({
      content:() => componentPdf.current,
      documentTitle : "Reservations",
      onAfterPrint:()=> alert("Data saved in PDF")
  });

  const columns = [
    { field: 'flightName', headerClassName: 'headerStyles', headerName: 'Flight Name', flex: 1 },
    { field: 'firstName', headerClassName: 'headerStyles', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerClassName: 'headerStyles', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerClassName: 'headerStyles', headerName: 'Email', flex: 1 },
    { field: 'phone', headerClassName: 'headerStyles', headerName: 'Phone', flex: 1 },
    { field: 'country', headerClassName: 'headerStyles', headerName: 'Country', flex: 1 },
    { field: 'date', headerClassName: 'headerStyles', headerName: 'date', flex: 1 },
    { field: 'fClass', headerClassName: 'headerStyles', headerName: 'Flight Class', flex: 1 },
    { field: 'noOfPassengers', headerClassName: 'headerStyles', headerName: 'Number of Passengers', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      headerClassName: 'headerStyles',
      flex: 2,
      Align: 'center',
      renderCell: (params) => (
        <div>
            <Button
              onClick={() => handleClick(params.id)}
              >
              <Edit style={{ fontSize: '19px' }} />
            </Button>
          <Button
            color="error"
            >
            <Delete onClick={() => handleDelete(params.id)} style={{ fontSize: '19px' }} />
          </Button>
          {/* <Button
            color="error"
            >
            <Delete onClick={() => handleDelete(params.id)} style={{ fontSize: '19px' }} />
          </Button> */}
          <Button><Link to={'/payments'} >Pay</Link></Button>
        </div>
      )
    }
    
  ];
//search function
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const searchedReservations = reservations.filter((reservation) =>
    reservation.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const rows = searchedReservations.map((reservation) => ({
    reservation_id: reservation._id,
    flightName: reservation.flightName,
    firstName: reservation.firstName,
    lastName: reservation.lastName,
    email: reservation.email,
    phone: reservation.phone,
    country: reservation.country,
    date: reservation.date,
    fClass: reservation.fClass,
    noOfPassengers: reservation.noOfPassengers,

  }));
  const getRowId = (row) => {
    return row.reservation_id
  }
  return (
    <Container>
      <Header />
      <Body>
        <ToolBar>
          <SearchContainer>
          <Input
            onChange={handleSearch} value={searchTerm}
            placeholder='Search email'
          />
            <SearchOutlined sx={{marginLeft: '-35px'}}/>
          </SearchContainer>
            <Button onClick={generatePDF} variant='contained'>Generate Report</Button>
        </ToolBar>
        <TableContainer ref={componentPdf} >
        <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          getRowId={getRowId}
        />
      </Box>
        </TableContainer>
      </Body>
      <Footer/>
    </Container>
    
  )
}
export default Reservations;