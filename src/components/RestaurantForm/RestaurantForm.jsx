import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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

    const handleChange = (event) => {
        setRestaurant({ ...restaurant, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleAddRestaurant(restaurant)
    }

    // will need to fetch restaurant details after backend is done
    useEffect(() => {

    });
    
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
                <input value={restaurant.rating} />
            </div>
            <div>
                <label htmlFor="review">Review:</label>
                <input type="text-area" name="review" id="review" value={restaurant.review} onChange={handleChange} />
            </div>
            <button type="submit">Add Restaurant</button>
        </form>
    )
}

export default RestaurantForm;