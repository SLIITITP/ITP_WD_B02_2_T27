import {Routes, Route} from 'react-router-dom'
import AddCarReservation from './pages/AddCarReservation';
import Reservations from './pages/CarReservations';
import Cars from './pages/Cars';
import Auth from './pages/Auth';
import Flights from './pages/Flights';
import UpdateReservation from './pages/UpdateCarReservation';
function App() {
  return (
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/add-carreservation' element={<AddCarReservation/>}/>
        <Route path='/update/:id' element={<UpdateReservation/>}/>
        <Route path='/carreservations' element={<Reservations/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/flight' element={<Flights/>}/>
      </Routes>
  );
}

export default App;
