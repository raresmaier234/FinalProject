import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeComponent from '../components/HomeComponent';
import ProfileComponent from '../components/ProfileComponent';
import CreateRentForm from '../components/Rent/CreateRent';
import RentComponent from '../components/Rent';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="/myprofile" element={<ProfileComponent />}></Route>
        <Route path="/createRent" element={<CreateRentForm />}></Route>
        <Route path="/trips" element={<RentComponent />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
