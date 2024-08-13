import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// importing star from react
import { IoIosStar } from "react-icons/io"; 

//mocking a restaurant until the backend is done
const mockRestaurant = [
    {id: 1, name: 'pink onion', category: 'Italian', rating: 5, review: 'best pizza spot in SF'},
    {id: 2, name: 'shi shi', category: 'Japanese', rating: 3, review: 'good vibes'},
    {id: 3, name: 'linlin', category: 'Indian', rating: 3.5, review: 'had a great time with my wife, great service'},
    {id: 4, name: 'sfasfa', category: 'American', rating: 0, review: 'terrible food and service'},
]
const fetchUserRestaurants = (userId) => {
    return mockRestaurant;
}
const Restaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const userId = 1;
    useEffect(() => {
        const userRestaurants = fetchUserRestaurants(userId);
        setRestaurants(userRestaurants);
    }, [userId]);
    return (
        <>
            <div>
                <h1>All Restaurants</h1>
                <Link to="/restaurants/new">Add Restaurant</Link>
                {/* <ul>
                    {restaurants.map((restaurant) => (
                        <li key={restaurant._id}>
                            <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
                        </li>
                    ))} 
                </ul> */} 
                {/* need backend for this to work */}

                {/* testing using mock data*/}
                <ul>
                    {restaurants.map((restaurant) => (
                        <li key={restaurant.id}>
                            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
                            <p>Ctg: {restaurant.category}</p>
                            <p><IoIosStar />: {restaurant.rating}</p>
                            <p>Reviews: {restaurant.review}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Restaurant;