import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as restaurantService from '../../services/restaurantService'

const RestaurantForm = (props) => {
    const [restaurant, setRestaurant] = useState({
        name: '', 
        category: '',
        rating: '',
        review: '',
        foodList: [],
    });
    const navigate = useNavigate();
    const {id} = useParams();

    // will need to fetch restaurant details after backend is done
    useEffect(() => {
        const getRestaurant = async () => {
            if(id) {
                try {
                    const data = await restaurantService.show(id);
                    setRestaurant(data);
                } catch (e) {
                    console.log('Error getting restaurant', e);
                }
            }
        }
        getRestaurant();
    }, [id]);

    const handleChange = (event) => {
        setRestaurant({ ...restaurant, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (id) {
                await restaurantService.update(id, restaurant);
                navigate(`/restaurants/${id}`);
            } else {
                await props.handleAddRestaurant(restaurant);
                navigate('/restaurants');
            }
        } catch (e) {
            console.log(e);
        }
    }

    
    
    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label htmlFor="name">Restaurant Name:</label>
                <input type="text" name="name" id="name" value={restaurant.name} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="category">Category:</label>
                <input type="text" name="category" id="category" value={restaurant.category} onChange={handleChange} />
            </div>
            <div>
                <label>Rating:</label>
                <input value={restaurant.rating} type='number' min='1' max='5' step='1' id='rating' name='rating' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="review">Review:</label>
                <input type="text-area" name="review" id="review" value={restaurant.review} onChange={handleChange} />
            </div>
            <button type="submit">{id ? 'Update' : 'Add Restaurant'}</button>
        </form>
    )
}

export default RestaurantForm;