import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const RestaurantForm = () => {
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

    });
    // need to write the handle submit and also setting each input onchange to events value
    return (
        <form onSubmit={}>

            <div>
                <label>Restaurant Name:</label>
                <input value={restaurant.name} />
            </div>
            <div>
                <label>Category:</label>
                <input value={restaurant.category} />
            </div>
            <div>
                <label>Rating:</label>
                <input value={restaurant.rating} />
            </div>
            <div>
                <label>Review:</label>
                <input value={restaurant.review} />
            </div>
            <button type="submit">Add Restaurant</button>
        </form>
    )
}

export default RestaurantForm;