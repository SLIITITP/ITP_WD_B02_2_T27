import {Routes, Route} from 'react-router-dom'
import AddCarReservation from './pages/AddCarReservation';
import CarReservations from './pages/CarReservations';
import Cars from './pages/Cars';
import AuthCar from './pages/AuthCar';
import Flights from './pages/Flights';
import UpdateCarReservation from './pages/UpdateCarReservation';
import Auth from './pages/Auth';
import UpdateReservation from './pages/UpdateReservation';
import AddReservation from './pages/AddReservation';
import Reservations from './pages/Reservations';
import Payments from './pages/payments';

import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
// import Navbar from './component/Navbar';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from './component/Login';
import Register from './component/Register';
import Uprofile from './component/Uprofile';
import UpdateProfile from './component/UpdateProfile';
import feedback from './component/feedback';
import Bookings from './component/Bookings/Bookings';
import MyReviews from './component/MyReviews/MyReviews';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AuthCar/>}/>
        <Route path='/add-carreservation' element={<AddCarReservation/>}/>
        <Route path='/update/:id' element={<UpdateCarReservation/>}/>
        <Route path='/carreservations' element={<CarReservations/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/flight' element={<Flights/>}/>
        <Route path='/fa' element={<Auth/>}/>
        <Route path='/add-reservation' element={<AddReservation/>}/>
        <Route path='/reservations/update/:id' element={<UpdateReservation/>}/>
        <Route path='/reservations' element={<Reservations/>}/>
        <Route path='/payments' element={<Payments/>}/>
        <Route exact path="/" Component={Login} />
        <Route exact path="/Register" Component={Register} />
        <Route exact path="/Uprofile/:id"Component={Uprofile}/>
        <Route exact path="/UpdateProfile/:id" Component={UpdateProfile}/>
        <Route exact path="/feedback/:id" Component={feedback}/>
        <Route exact path="/Bookings" Component={Bookings}/>
        <Route exact path="/MyReviews" Component={MyReviews}/>
      </Routes>
      <Footer/>
      </div>

      
  );
}

export default App;
