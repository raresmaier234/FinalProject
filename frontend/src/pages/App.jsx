import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeComponent from '../components/HomeComponent';
import ProfileComponent from '../components/ProfileComponent';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="/myprofile" element={<ProfileComponent />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
