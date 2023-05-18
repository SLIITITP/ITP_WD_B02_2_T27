import { Routes, Route } from 'react-router-dom'
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
import Home from './pages/Home';
import Pakage from './pages/Pakage';
import AllPakages from './pages/AllPakages';
import CreatePakage from './pages/CreatePakage';
import Dashboard from './pages/Dashboard';
import UpdatePakage from './pages/UpdatePakage';
import PakageHotels from './pages/PakageHotels';
import CreateHotel from './pages/CreateHotel';
import UpdateHotel from './pages/UpdateHotel';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthCar />} />
      <Route path='/add-carreservation' element={<AddCarReservation />} />
      <Route path='/update/:id' element={<UpdateCarReservation />} />
      <Route path='/carreservations' element={<CarReservations />} />
      <Route path='/cars' element={<Cars />} />
      <Route path='/flight' element={<Flights />} />
      <Route path='/fa' element={<Auth />} />
      <Route path='/add-reservation' element={<AddReservation />} />
      <Route path='/reservations/update/:id' element={<UpdateReservation />} />
      <Route path='/reservations' element={<Reservations />} />
      <Route path='/payments' element={<Payments />} />
      <Route path="/" element={<Home />} />
      <Route path="/pakage/:id" element={<Pakage />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/Allpakages" element={<AllPakages />} />
      <Route path="/admin/pakage/new" element={<CreatePakage />} />
      <Route path="/admin/pakage/:id/update" element={<UpdatePakage />} />
      <Route path="/admin/pakage/:id/hotels" element={<PakageHotels />} />
      <Route path="/admin/pakage/:id/hotel/new" element={<CreateHotel />} />
      <Route path="/admin/hotel/:id/update" element={< UpdateHotel />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
