import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import * as restaurantService from '../../services/restaurantService';
import * as authService from '../../services/authService';
import styles from './Restaurant.module.css';


const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const user = authService.getUser();
        if (user) {
          const userId = user._id;
          const restaurantsData = await restaurantService.index();
          setRestaurants(restaurantsData);
        } else {
          setError('User not logged in');
        }
      } catch (error) {
        setError('Error fetching restaurants');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <main className={styles.container}>
      <h1>All Restaurants</h1>
      <Link to="/restaurants/new">Add Restaurant</Link>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
            <p>Ctg: {restaurant.category}</p>
            <p><IoIosStar />: {restaurant.rating}</p>
            <p>Reviews: {restaurant.review}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
export default Restaurant;