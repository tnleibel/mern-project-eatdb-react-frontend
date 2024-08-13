import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import * as authService from '../src/services/authService'
import * as restaurantService from '../src/services/restaurantService'
import Register from "./components/Register/Register";
import SignIn from "./components/SignIn/SignIn";
import NavBar from './components/NavBar/NavBar';
import Restaurant from './components/Restaurant';
import RestaurantForm from './components/RestaurantForm/RestaurantForm';

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [restaurants, setRestaurants] = useState([])

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  const handleAddRestaurant = async (restaurantData) => {
    const newRestaurant = await restaurantService.create(restaurantData)
    setRestaurants([newRestaurant, ...restaurants])
  }
  
  return (
    <>
      <NavBar user={user} setUser={setUser} handleSignout={handleSignout} />
      <Routes>
        {/* <Route path='/' element={<Landing />} /> */}
        <Route path='/sign-up' element={<Register />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/restaurants' element={<Restaurant />} />
        <Route path='/restaurants/new' element={<RestaurantForm handleAddRestaurant={handleAddRestaurant} />} />
      </Routes>
    </> 
  );
}

export default App
