import {Routes, Route} from 'react-router-dom'
import AddReservation from './pages/AddReservation';
import Reservations from './pages/Reservations';
import Flights from './pages/Flights';
import Auth from './pages/Auth';
import UpdateReservation from './pages/UpdateReservation';
import Cars from './pages/Cars';
import Payments from './pages/Payments'
function App() {
  return (
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/add-reservation' element={<AddReservation/>}/>
        <Route path='/reservations/update/:id' element={<UpdateReservation/>}/>
        <Route path='/reservations' element={<Reservations/>}/>
        <Route path='/flights' element={<Flights/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/payments' element={<Payments/>}/>
  
      
      </Routes>
  );
}

export default App;
