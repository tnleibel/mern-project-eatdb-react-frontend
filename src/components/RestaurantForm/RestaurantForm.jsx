import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as restaurantService from '../../services/restaurantService';
import styles from './RestaurantForm.module.css';

const RestaurantForm = (props) => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    category: '',
    rating: '',
    review: '',
    foodList: [],
  });
  const navigate = useNavigate();
  const { id } = useParams();


  const handleChange = (event) => {
    setRestaurant({ ...restaurant, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        console.log(id)
        props.handleUpdateRestaurant(id, restaurant)
        navigate(`/restaurants/${id}`);
      } else {
        console.log('no ID')
        props.handleAddRestaurant(restaurant);
        navigate('/restaurants');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const getSingleRestaurant = async () => {
      if(id) {
        const returnedData = await restaurantService.show(id);
        setRestaurant(returnedData);
      }
    } 
    getSingleRestaurant();
    
}, [id]);

  return (
    <main className={styles.container}>
      <header>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name-input">Restaurant Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={restaurant.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category-input">Category:</label>
            <input
              type="text"
              name="category"
              id="category"
              value={restaurant.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="rating-input">Rating:</label>
            <input
              value={restaurant.rating}
              type="number"
              min="1"
              max="5"
              step="1"
              id="rating"
              name="rating"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="review-input">Review:</label>
            <textarea
              name="review"
              id="review"
              value={restaurant.review}
              onChange={handleChange}
            />
          </div>
          <button type="submit">{id ? 'Update' : 'Add Restaurant'}</button>
        </form>
      </header>
    </main>
  );
};
export default RestaurantForm;
