import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeComponent from '../components/HomeComponent';
import ProfileComponent from '../components/ProfileComponent';
import CreateRentForm from '../components/Rent/CreateRent';
import RentComponent from '../components/Rent';
import RentProfile from '../components/Rent/RentProfile';
import BookingForm from '../components/Booking';
import Layout from '../components/Layout';
import UserProfile from '../components/UserProfile';
import PendingBookings from '../components/Rent/PendingBookings';

function App() {
  return (

    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeComponent />}></Route>
          <Route path="/pending-bookings" element={<PendingBookings />} />
          <Route path='/profile' element={<UserProfile />}></Route>
          <Route path="/myprofile" element={<ProfileComponent />}></Route>
          <Route path="/createRent" element={<CreateRentForm />}></Route>
          <Route path="/trips" element={<RentComponent />}></Route>
          <Route path="/:id/:name" element={<RentProfile />}></Route>
          <Route path="/booking/:rentId" element={<BookingForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
