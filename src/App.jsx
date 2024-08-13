import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import * as authService from '../src/services/authService'
import Register from "./Register/Register";
import SignIn from "./SignIn/SignIn";
import NavBar from './NavBar/NavBar';
import Restaurant from './Restaurant.jsx/Restaurant';
const App = () => {
  const [user, setUser] = useState(authService.getUser())
  
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        {/* <Route path='/' element={<Landing />} /> */}
        <Route path='sign-up' element={<Register />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='landing' element={<Restaurant />} />
      </Routes>
    </> 
  );
}

export default App
