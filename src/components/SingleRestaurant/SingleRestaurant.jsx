import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from '../../App'
// import { IoIosStar } from "react-icons/io"; 
import { Link, useParams } from "react-router-dom";
import * as authService from '../../services/authService'
import * as restaurantService from '../../services/restaurantService'
import FoodForm from "../FoodForm/FoodForm";
import FoodIndex from "../FoodIndex/FoodIndex";
import { PiDropSimple } from "react-icons/pi";

const SingleRestaurant = (props) => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams();
    const user = useContext(AuthedUserContext)

    const handleAddFood = async (id, foodFormData) => {
        const newFood = await restaurantService.createFood(id, foodFormData)
        console.log(newFood)
        setRestaurant({ ...restaurant, foodList: [...restaurant.foodList, newFood] })
      }

    useEffect(() => {
        const getSingleRestaurant = async () => {
            const returnedData = await restaurantService.show(id);
            setRestaurant(returnedData);
        } 
        getSingleRestaurant();
        
    }, [id]);
    if (!restaurant) {
        return <div>No restaurant found in the database</div>
    }
    return (
        <>
            <div>
                <h1>{restaurant.name}</h1>
                <p>Category: {restaurant.category}</p>
                <p>Rating: {restaurant.rating}</p>
                <p>Review: {restaurant.review}</p>
                <Link to={`/restaurants/${id}/edit`}>Edit</Link>
                <button onClick={() => props.handleDeleteRestaurant(id)}>Delete</button>
                <h3><strong>FoodList</strong></h3>
                <FoodForm handleAddFood={handleAddFood} />
                <ul>
                    {restaurant.foodList.length > 0 ? (
                        restaurant.foodList.map((food) => (
                            <li key={food._id}>
                                <p>{food.name}</p>
                                <p>{food.ingredients}</p>
                                <p>{food.isVegan ? "Vegan" : "Not Vegan"}</p>
                                <p>Food Rating: {food.rating}</p>
                                <p>Price: {food.price}</p>
                                <Link to={`/restaurants/${id}/foods/edit/${food._id}`}>Edit Food</Link>
                            </li>
                        ))
                    ) : (
                        <p>Nothing is in foodList</p>
                    )} 
                </ul>
                <Link to={`/restaurants/${id}/foods/new`}>Add Food/Menu</Link>
            </div>
        </>
    ) 
}

export default SingleRestaurant;