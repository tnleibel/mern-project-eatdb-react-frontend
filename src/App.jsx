import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  const handleAddRestaurant = async (restaurantData) => {
    const newRestaurant = await restaurantService.create(restaurantData)
    setRestaurants([newRestaurant, ...restaurants])
  }

  const handleDeleteRestaurant = async (restaurantId) => {
    const toDelete = await restaurantService.deleteRestaurant(restaurantId)
    setRestaurants(restaurants.filter((restaurant) => restaurant._id !== restaurantId))
    navigate(`/restaurants/${restaurantId}`)
  }

  const handleUpdateRestaurant = async (restaurantId, restaurantData) => {
    const toUpdate = await restaurantService.update(restaurantId, restaurantData)
    setRestaurants(restaurants.map((restaurant) => (restaurantId === restaurant._id ? toUpdate : restaurant)))
    navigate(`/restaurants/${restaurantId}`)
  }

  useEffect (() => {
    const fetchRestaurants = async () => {
      const restaurantsData = await restaurantService.index()
      console.log(('restaurantsData', restaurantsData))
    }
    if (user) fetchRestaurants()
  }, [user])
  
  return (
    <>
      <NavBar user={user} setUser={setUser} handleSignout={handleSignout} />
      <Routes>
        {/* <Route path='/' element={<Landing />} /> */}
        <Route path='/sign-up' element={<Register />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/restaurants' element={<Restaurant />} />
        <Route path='/restaurants/new' element={<RestaurantForm handleAddRestaurant={handleAddRestaurant} />} />
        {/* <Route path='/restaurants/:restaurantId' element={<RestaurantDetails handleDeleteRestaurant={handleDeleteRestaurant} />} /> */}
        <Route path='/restaurants/:restaurantId/edit' element={<RestaurantForm handleUpdateRestaurant={handleUpdateRestaurant} />} />
      </Routes>
    </> 
  );
}

export default App
