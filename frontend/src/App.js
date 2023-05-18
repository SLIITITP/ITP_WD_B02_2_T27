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

function App() {
  return (
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
      </Routes>
  );
}

export default App;
